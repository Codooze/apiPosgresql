const express = require("express");
const usersRouter = require("./routes/users");
module.exports = () => {
  // we do it this way for testing porpuses
  const app = express();
  app.use(express.json());
  app.use(usersRouter);
  return app;
};
