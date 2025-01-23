const mongoose = require('mongoose');

// Create a separate schema for book details that matches your Book and Detail models
const bookDetailsSchema = new mongoose.Schema({
  Title: { 
    type: String, 
    required: true 
  },
  BookAuthor: {
    type: [String],
    default: []
  },
  Publisher: {
    type: String,
    default: ''
  },
  YearOfPublication: {
    type: String,
    default: ''
  },
  ImageURLS: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  previewLink: {
    type: String,
    default: ''
  },
  infoLink: {
    type: String,
    default: ''
  },
  categories: {
    type: [String],
    default: []
  }
}, { _id: false });

const favoriteSchema = new mongoose.Schema(
  {
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true
    },
    bookDetails: [bookDetailsSchema]
  },
  { 
    timestamps: true,
    versionKey: false
  }
);

// Create compound index
favoriteSchema.index({ userId: 1, 'bookDetails.Title': 1 });

const Favorite = mongoose.model("Favorite", favoriteSchema);

module.exports = Favorite;