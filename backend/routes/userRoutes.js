const express = require("express");
const User = require("../models/User");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.getAllUsers);

router.post("/", async (req, res) => {
    try {
      const newUser = new User(req.body);
      const saved = await newUser.save();
      res.status(201).json(saved);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Failed to save user" });
    }
  });

  router.put('/:id', async (req, res) => {
    try {
      console.log("Incoming PUT request:", req.params.id);
      console.log("Request body:", req.body);
  
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error("Update Error:", error);
      res.status(500).json({ message: 'Update failed', error: error.message });
    }
  });
  
module.exports = router;
