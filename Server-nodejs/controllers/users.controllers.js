const User = require("../models/users.model")


const postFavoriteBook = async (req, res) => {
    try {
      const { title, author, pictureUrl, review } = req.body;
      const user = await User.findById(req.user._id);
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      user.favoriteBooks.push({
        title,
        author,
        genre,
        pictureUrl,
        review,
      });
  
      await user.save();
  
      res.status(201).json({ message: "Book added to favorites" });
    } catch (error) {
      res.status(500).json({ error: "An error occurred" });
    }
  };





module.exports = {postFavoriteBook}