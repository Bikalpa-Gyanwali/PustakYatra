const mongoose = require("mongoose");

// Define the schema for a user
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    category: { type: String, required: true }, // User category
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

// Create the model using the schema
const User = mongoose.model("User", userSchema);

module.exports = User;
