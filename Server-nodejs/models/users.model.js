const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    pictureUrl: String,
    review: String,
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  });


  const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    favoriteBooks: [bookSchema],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  });

const User = mongoose.model("User", userSchema);

module.exports = User;
