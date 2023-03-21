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

  //REALLY BIG SECURITY ISSUE, NEVER DO THIS IN PRODUCTION
  query(sql) {
    return this._pool.query(sql);
  }
}

module.exports = new Pool();
