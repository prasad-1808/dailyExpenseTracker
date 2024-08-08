const express = require("express");
const {
  register,
  login,
  getUserData,
  updateUser,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware"); // Assuming you have an auth middleware for protected routes
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/:userId", authMiddleware, getUserData); // Adding getUserData route
router.put("/:userid", authMiddleware, updateUser);

module.exports = router;
