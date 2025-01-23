const mongoose = require('mongoose');

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

const wishlistSchema = new mongoose.Schema(
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

wishlistSchema.index({ userId: 1, 'bookDetails.Title': 1 });

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

module.exports = Wishlist;