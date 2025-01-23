const Wishlist = require("../models/wishlist.js");

const addToWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { bookDetails } = req.body;

    // Debug logs
    console.log('User ID:', userId);
    console.log('Received request body:', req.body);
    console.log('Book Details:', bookDetails);

    // Validation
    if (!bookDetails) {
      return res.status(400).json({ message: "Book details are required" });
    }


    if (!bookDetails.Title) {
      return res.status(400).json({ 
        message: "Book title is required",
        receivedDetails: bookDetails
      });
    }

    // Create new wishlist document
    const newWishlistItem = {
      userId,
      bookDetails: [{
        Title: bookDetails.Title,
        BookAuthor: bookDetails.BookAuthor || [],
        Publisher: bookDetails.Publisher || '',
        YearOfPublication: bookDetails.YearOfPublication || '',
        ImageURLS: bookDetails.ImageURLS || '',
        description: bookDetails.description || '',
        previewLink: bookDetails.previewLink || '',
        infoLink: bookDetails.infoLink || '',
        categories: bookDetails.categories || []
      }]
    };

    console.log('Attempting to save:', newWishlistItem);

    const wishlist = await Wishlist.findOneAndUpdate(
      { userId },
      { $addToSet: { bookDetails: newWishlistItem.bookDetails[0] } },
      { 
        upsert: true,
        new: true,
        setDefaultsOnInsert: true 
      }
    );

    console.log('Saved wishlist:', wishlist);

    res.status(201).json({ 
      message: "Book added to wishlist successfully", 
      wishlist: wishlist 
    });

  } catch (error) {
    console.error("Detailed error:", {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    res.status(500).json({ 
      message: "Failed to add book to wishlist",
      error: error.message 
    });
  }
};

const getWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const wishlist = await Wishlist.findOne({ userId });

    res.status(200).json({ 
      wishlist: wishlist ? wishlist.bookDetails : [] 
    });
  } catch (error) {
    console.error("Error retrieving wishlist:", error);
    res.status(500).json({ message: "Failed to fetch wishlist" });
  }
};

const removeFromWishlist = async (req, res) => {
    try {
      const userId = req.user.id;
      const { title } = req.params;
  
      // Validate title parameter
      if (!title) {
        return res.status(400).json({ message: "Book title is required" });
      }
  
      // Find the user's wishlist first to check if the book exists
      const existingWishlist = await Wishlist.findOne({ 
        userId, 
        'bookDetails.Title': title 
      });
  
      if (!existingWishlist) {
        return res.status(404).json({ 
          message: "Book not found in your wishlist" 
        });
      }
  
      const result = await Wishlist.findOneAndUpdate(
        { userId },
        { $pull: { bookDetails: { Title: title } } },
        { new: true }
      );
  
      res.status(200).json({ 
        success: true,
        message: "Book successfully removed from wishlist", 
        wishlist: result.bookDetails 
      });
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      res.status(500).json({ 
        success: false,
        message: "Failed to remove book from wishlist",
        error: error.message 
      });
    }
  };

module.exports = { addToWishlist, getWishlist, removeFromWishlist };