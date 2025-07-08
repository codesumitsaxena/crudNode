const mongoose = require("mongoose");
const User = require("./models/User");
const usersData = require("./UserMock.json");
require("dotenv").config();

const insertData = async () => {
  try {
    if (!Array.isArray(usersData)) {
      throw new Error("UserMock.json is not an array of users.");
    }

    console.log("Total users to insert:", usersData.length);

    await mongoose.connect(process.env.MONGO_URI);
    console.log(" MongoDB connected");

    await User.deleteMany();
    console.log(" Old users deleted");

    const result = await User.insertMany(usersData, { ordered: false });
    console.log("Inserted:", result.length, "documents");
    const extraInsert = await User.insertMany(fiveUsers, { ordered: false });
    console.log("Extra users inserted:", extraInsert.length);

    process.exit();
  } catch (error) {
    console.error("Insert Error:", error.message);
    process.exit(1);
  }
};

insertData();
 