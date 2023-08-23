const User = require("../models/users.model")


const postBook = async (req, res) => {
  try {
    const { title, author, pictureUrl, review, genre } = req.body;
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const newBook = {
      title,
      author,
      genre,
      pictureUrl,
      review,
      user: user._id,
    };

    user.ownBooks.push(newBook);
    await user.save();
    res.status(200).json({ message: "Book created", "newBook": newBook });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
  
const userInfo = async (req, res) => {
  try {
    const userId = req.user._id;
    const userData = await User.findById(userId)
      .populate('favoriteBooks')
      .populate('following');
    console.log(userId);
    const ownLikesCount = userData.ownBooks.reduce((total, book) => total + book.likes.length, 0);
    const ownBooksCount = userData.ownBooks.length;
    const followingCount = userData.following.length;
    const ownBooks = userData.ownBooks;
    const favoriteBooks = userData.favoriteBooks;

    const userInfo = {
      username: userData.username,
      ownLikesCount,
      ownBooksCount,
      followingCount,
      ownBooks,
      favoriteBooks,
    };

    res.json(userInfo);
  } catch (error) {
    console.error(error);
    res.json(userInfo);
  }
}

const searchUser = async (req, res) => {
  try {
    const { username } = req.body;

    const foundUsers = await User.find({ username: { $regex: username, $options: 'i' } })
      .populate('following', '_id')
  
    const currentUser = await User.findById(req.user._id).populate('following', '_id');

    const searchResults = foundUsers.map((user) => ({
      username: user.username,
      isFollowed: currentUser.following.includes(user._id), 
      ownBooksCount: user.ownBooks.length,
    }));

    res.json({ searchResults });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};








module.exports = {userInfo, postBook, searchUser}