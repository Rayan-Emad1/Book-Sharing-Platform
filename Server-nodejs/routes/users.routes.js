const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controllers");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/add_book", authMiddleware , usersController.postFavoriteBook);

  
module.exports = router;