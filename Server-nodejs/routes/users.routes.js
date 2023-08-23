const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controllers");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/get_user_info", authMiddleware , usersController.userInfo);
router.post("/add_book", authMiddleware , usersController.postBook);

router.post("/search_user", authMiddleware , usersController.searchUser);
router.post("/follow_user", authMiddleware , usersController.togglefollowUser);

router.get("/following_books", authMiddleware , usersController.getBooks);
router.post("/like_book", authMiddleware , usersController.toggleLikeBook);
  
module.exports = router;