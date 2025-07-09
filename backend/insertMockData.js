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
    console.log("MongoDB connected");

    await User.deleteMany();
    console.log("Old users deleted");

    const transformedData = usersData.map(user => ({
      ...user,
      _id: user.id
    }));

    const result = await User.insertMany(transformedData, { ordered: false });
    console.log("Inserted:", result.length, "documents");

    const dbCount = await User.countDocuments();
    console.log("Database count:", dbCount);
    
    if (dbCount !== usersData.length) {
      console.error("COUNT MISMATCH! Expected:", usersData.length, "Actual:", dbCount);
    }
    
    process.exit();
  } catch (error) {
    console.error("Insert Error:", error.message);
    if (error.name === 'MongoBulkWriteError') {
      console.error("Duplicate errors:", error.writeErrors);
    }
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log("MongoDB disconnected");
  }
};

insertData();