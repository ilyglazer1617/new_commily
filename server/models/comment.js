const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const schema = new mongoose.Schema({
  body: {
    type: String,
    required: true,
    maxlength: 150,
    minlength: 1,
  },
  name: {
    type: String,
    required: true,
  },
});

const Comment = new mongoose.model("Comment", schema);
function validateComment(comment) {
  const schema = {
    body: Joi.string().min(1).max(150),
    name: Joi.string().min(1).max(150),
  };
  return Joi.validate(comment, schema);
}
module.exports.validate = validateComment;
module.exports.Comment = Comment;
