const _ = require("lodash");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const express = require("express");
const mongoose = require("mongoose");
const Joi = require("joi");
const { User, validateLogIn } = require("../models/user");
const logInRouter = express.Router();

logInRouter.post("/", async (req, res) => {
  const { error } = validateLogIn(req.body);
  // console.log(error);
  if (error) {
    res.status(401).send(error.details[0].message);
    return;
  }

  let user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(401).send("email or password wrong ");
  }
  console.log(user);

  const password = await bcrypt.compare(req.body.password, user.password);
  if (password) {
    let token = "email or password wrong";
    token = user.generateJWT();
    return res
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .send(token);
  }
  return res.status(401).send("email or password wrong");
  // try {
  //   if (password) {
  //     token = user.generateJWT();
  //     res
  //       .header("x-auth-token", token)
  //       .header("access-control-expose-headers", "x-auth-token")
  //       .send(token);
  //   }
  // } catch (error) {
  //   res.status(401).send("email or password wrong");
  // }
});

module.exports = logInRouter;
