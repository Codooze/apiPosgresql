const express = require("express");
const router = express.Router();
const UserRepo = require("../repos/user-repo");

router.get("/users", async (req, res) => {
  const users = await UserRepo.findAll();
  res.send(users);
});

router.get("/users/:id", (req, res) => {
  res.send("Hello World!");
});

router.post("/users", (req, res) => {
  res.send("Hello World!");
});

router.put("/users/:id", (req, res) => {
  res.send("Hello World!");
});

router.delete("/users/:id", (req, res) => {
  res.send("Hello World!");
});

module.exports = router;
