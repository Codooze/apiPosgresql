const express = require("express");
const router = express.Router();
const UserRepo = require("../repos/user-repo");

router.get("/users", async (req, res) => {
  const users = await UserRepo.findAll();
  res.send(users);
});

router.get("/users/:id", async (req, res) => {
  const { id } = req.params;

  const user = await UserRepo.findById(id);
  !user ? res.sendStatus(404) : res.send(user);
});

router.post("/users", async (req, res) => {
  const { username, bio } = req.body;
  const user = await UserRepo.insert(username, bio);
  res.send(user); //send back the user that was created, so that it can be displayed on the front end
});

router.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { username, bio } = req.body;
  const user = await UserRepo.update(id, username, bio);
  !user ? res.sendStatus(404) : res.send(user);
});

router.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  const user = await UserRepo.delete(id);
  !user ? res.sendStatus(404) : res.sendStatus(204);
});

module.exports = router;
