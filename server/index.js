const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const user = require("./routes/user");
const logIn = require("./routes/auth");
const comment = require("./routes/comment");
// const auth = require("./middleware/auth");
mongoose.set("strictQuery", false);
const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/commily")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("coudnt connect to MogoDB"));

app.use(cors());
app.use(express.json()); // conver json to javascript and javascript to json
app.use(express.static("public"));
// app.use(auth);
app.use("/api/users", user);
app.use("/api/auth", logIn);
app.use("/api/comments", comment);
const port = process.env.PORT || 3050;

app.listen(port, () => console.log(`active on ${port}`));
