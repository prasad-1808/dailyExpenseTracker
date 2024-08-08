const express = require("express");
const {
  register,
  login,
  getUserData,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware"); // Assuming you have an auth middleware for protected routes
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/:userId", authMiddleware, getUserData); // Adding getUserData route

module.exports = router;
