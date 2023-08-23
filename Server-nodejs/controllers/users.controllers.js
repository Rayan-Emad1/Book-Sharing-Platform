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
    res.status(500).json({ error: error.message });
  }
}

const searchUser = async (req, res) => {
  try {
    const { username } = req.body;
    const currentUser = await User.findById(req.user._id).populate('following', '_id');

    const foundUsers = await User.find({username: { $regex: username, $options: 'i' }, _id: { $ne: currentUser._id }});
  

    const searchResults = foundUsers.map((user) => ({
      id: user._id,
      username: user.username,
      isFollowed: currentUser.following.includes(user._id), 
      ownBooksCount: user.ownBooks.length,
    }));

    res.json({ searchResults });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const togglefollowUser = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user._id);
    const targetUser = await User.findById(req.body.userId);

    if (currentUser.following.includes(targetUser._id)) {
      currentUser.following.pull(targetUser._id);
      await currentUser.save();
      res.json({ message: 'User Unfollowed' });

    } else {
      currentUser.following.push(targetUser._id);
      await currentUser.save();
      res.json({ message: 'User Followed' });
    }
  } 
  
  catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBooks = async (req, res) => {
  try {
    const current_user = await User.findById(req.user._id).populate('following');
    
    const following_list = current_user.following;
    const booksFromFollowing = [];

    for (const user of following_list) {
      const userWithBooks = await User.findById(user._id).populate('ownBooks');
      booksFromFollowing.push(...userWithBooks.ownBooks);
    }

    const allFollowingBooks = booksFromFollowing.flat();

    res.json({ followingBooks: allFollowingBooks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



module.exports = {userInfo, postBook, searchUser,togglefollowUser, getBooks}