const User = require('../models/User');

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    console.log("✅ Users fetched from DB:", users); // <-- YEH LINE ADD KARNA
    res.status(200).json(users);
  } catch (error) {
    console.log("❌ Error fetching users:", error.message);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};


