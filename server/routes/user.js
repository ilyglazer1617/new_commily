const _ = require("lodash");
const bcrypt = require("bcrypt");
const express = require("express");
const mongoose = require("mongoose");
const { User, validate } = require("../models/user");
const router = express.Router();
const jwt = require("jsonwebtoken");

// router.get("/", async (req, res) => {
//   const allUsers = await User.find();
//   res.send(allUsers);
// });

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  console.log(user);
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already exsist ");

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10); //! saves the password with salted code
  user.password = await bcrypt.hash(user.password, salt);

  try {
    user = await user.save();
  } catch (err) {
    res.status(500).send("somethong went wrong");
  }
  console.log(user);

  res
    .header("x-auth-token", user.generateJWT())
    .header("access-control-expose-headers", "x-auth-token")
    .send(_.pick(user, ["name", "email"]));
});

module.exports = router;
