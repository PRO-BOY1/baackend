const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

// Register User (Admin command)
router.post("/register", async (req, res) => {
  try {
    const { guild, user, email, password } = req.body;

    // Check if user already exists
    let existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Create new user (password is automatically hashed)
    const newUser = new User({ guild, user, email, password });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Login User
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "User not found" });

    // Compare hashed password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "1h" });

    res.json({ token, user: { email: user.email, id: user._id } });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get User Details
router.get("/details/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      email: user.email,
      cash: user.c1.cash,
      bank: user.c1.bank,
      total: user.c1.cash + user.c1.bank
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
