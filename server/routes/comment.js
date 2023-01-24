const _ = require("lodash");
const express = require("express");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const { Comment, validate } = require("../models/comment");

const commentRouter = express.Router();

commentRouter.get("/", async (req, res) => {
  const allComments = await Comment.find();
  res.send(allComments);
});
commentRouter.get("/", async (req, res) => {
  const allUsers = await User.find();
  res.send(allUsers);
});
commentRouter.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  try {
    let comment = new Comment({
      ...req.body,
    });
    comment = await comment.save();
    console.log(comment);
  } catch (error) {
    res.status(401).send(error.message);
  }
});

//!delete by id
commentRouter.delete("/:id", async (req, res) => {
  try {
    const comment = await Comment.findByIdAndRemove(req.params.id);
    res.status(200).send("this comment deleted" + comment);
  } catch (error) {
    res.status(401).send(error);
  }
});

module.exports = commentRouter;
