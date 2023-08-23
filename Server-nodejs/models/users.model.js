const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
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
    ownBooks: [bookSchema],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  });

const User = mongoose.model("User", userSchema);

module.exports = User;
