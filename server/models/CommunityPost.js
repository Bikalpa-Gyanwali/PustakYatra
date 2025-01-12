const mongoose = require('mongoose');

const CommunityPostSchema = new mongoose.Schema({
  author: { type: String, required: true },
  bookName: { type: String, required: true },
  content: { type: String, required: true },
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

module.exports = mongoose.model('CommunityPost', CommunityPostSchema);
