const mongoose = require('mongoose');

// Define the schema for a user
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Create the model using the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
