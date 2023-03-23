const pg = require("pg");

class Pool {
  _pool = null;

  connect(options) {
    //options is an object, this is used so that later we can connect to a different database
    this._pool = new pg.Pool(options);
    return this._pool.query("SELECT 1+1");
  }

  close() {
    return this._pool.end();
  }

  //REALLY IMPORTANT TO ADD params to the query TO PREVENT SQL INJECTION
  query(sql, params) {
    return this._pool.query(sql, params);
  }
}

module.exports = new Pool();
