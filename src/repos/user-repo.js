const pool = require("../pool");
const toCamelCase = require("./utils/to-camel-case");

class UserRepo {
  static async findAll() {
    const { rows } = await pool.query("SELECT * FROM users");

    return toCamelCase(rows);
  }

  static async findById(id) {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    return toCamelCase(rows)[0];
  }

  static async insert(user, bio) {
    const { rows } = await pool.query(
      "INSERT INTO users (username, bio) VALUES ($1, $2) RETURNING *",
      [user, bio]
    ); // we use RETURNING * to return the row that was created
    return toCamelCase(rows)[0];
  }

  static async update(id, user, bio) {
    const { rows } = await pool.query(
      "UPDATE users SET username = $1, bio = $2 WHERE id = $3 RETURNING *",
      [user, bio, id]
    );
    return toCamelCase(rows)[0];
  }

  static async delete(id) {
    const { rows } = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [id]
    );
    return toCamelCase(rows)[0];
  }

  static async count() {
    const { rows } = await pool.query("SELECT COUNT(*) FROM users");
    return parseInt(rows[0].count);
  }
}

module.exports = UserRepo;
