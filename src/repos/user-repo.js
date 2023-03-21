const pool = require("../pool");

class UserRepo {
  static async findAll() {
    const { rows } = await pool.query("SELECT * FROM users");
    return rows;
  }

  static async findById(id) {
    return await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  }

  static async insert(user) {
    return await pool.query();
  }

  static async update(user) {
    return await pool.query();
  }

  static async delete(id) {
    return await pool.query();
  }
}

module.exports = UserRepo;
