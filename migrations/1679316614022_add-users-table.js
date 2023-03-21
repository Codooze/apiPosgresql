/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(30) NOT NULL,
            bio VARCHAR(500),
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
    `);
};

exports.down = (pgm) => {
  pgm.sql(`
        DROP TABLE users;
    `);
};

//bash: DATABASE_URL=postgres://postgres:jeison30jJ@localhost:5432/socialnetwork pnpm migrate up
//set DATABASE_URL=postgres://postgres:jeison30jJ@localhost:5432/socialnetwork&&pnpm migrate up
