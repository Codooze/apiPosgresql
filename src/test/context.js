const { randomBytes } = require("crypto");
const format = require("pg-format");
const { default: migrate } = require("node-pg-migrate");
const pool = require("../pool");

const DEFAULT_OPS = {
  host: "localhost",
  port: 5432,
  database: "socialnetwork-test",
  user: "postgres",
  password: "jeison30jJ",
};

class Context {
  static async build() {
    // Randomly generating a role name to connect to PG as
    const roleName = "a" + randomBytes(4).toString("hex");

    // Connect to PG as usual
    await pool.connect({
      host: "localhost",
      port: 5432,
      database: "socialnetwork-test",
      user: "postgres",
      password: "jeison30jJ",
    });

    // Create a new role
    await pool.query(
      format("CREATE ROLE %I WITH LOGIN PASSWORD %L;", roleName, roleName)
    );

    // Create a schema with the same name
    await pool.query(
      format("CREATE SCHEMA %I AUTHORIZATION %I;", roleName, roleName)
    );

    // Disconnect entirely from PG
    await pool.close();

    // Run our migrations in the new schema
    await migrate({
      schema: roleName,
      direction: "up",
      log: () => {},
      noLock: true,
      dir: "migrations",
      databaseUrl: {
        host: "localhost",
        port: 5432,
        database: "socialnetwork-test",
        user: roleName,
        password: roleName,
      },
    });

    // Connect to PG as the newly created role
    await pool.connect({
      host: "localhost",
      port: 5432,
      database: "socialnetwork-test",
      user: roleName,
      password: roleName,
    });

    return new Context(roleName);
  }

  constructor(roleName) {
    this.roleName = roleName;
  }

  async close() {
    // Disconnect from PG
    await pool.close();

    // Connect to PG as usual
    await pool.connect(DEFAULT_OPS);

    // Drop the schema and role we created
    await pool.query(format("DROP SCHEMA %I CASCADE;", this.roleName));
    await pool.query(format("DROP ROLE %I;", this.roleName));

    // Disconnect from PG
    await pool.close();
  }
}

module.exports = Context;
