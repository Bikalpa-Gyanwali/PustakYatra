const Favorite = require("../models/Favorite");
const addFavorite = async (req, res) => {
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

    // Create new favorite document
    const newFavorite = {
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

    console.log('Attempting to save:', newFavorite);

    const favorite = await Favorite.findOneAndUpdate(
      { userId },
      { $addToSet: { bookDetails: newFavorite.bookDetails[0] } },
      { 
        upsert: true,
        new: true,
        setDefaultsOnInsert: true 
      }
    );

    console.log('Saved favorite:', favorite);

    res.status(201).json({ 
      message: "Book added to favorites successfully", 
      favorite: favorite 
    });

  } catch (error) {
    console.error("Detailed error:", {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    res.status(500).json({ 
      message: "Failed to add book to favorites",
      error: error.message 
    });
  }
};

const getFavorites = async (req, res) => {
  try {
    const userId = req.user.id;

    const favorite = await Favorite.findOne({ userId });

    res.status(200).json({ 
      favorites: favorite ? favorite.bookDetails : [] 
    });
  } catch (error) {
    console.error("Error retrieving favorites:", error);
    res.status(500).json({ message: "Failed to fetch favorites" });
  }
};

const removeFavorite = async (req, res) => {
  try {
    const userId = req.user.id;
    const { title } = req.params;

    // Validate title parameter
    if (!title) {
      return res.status(400).json({ message: "Book title is required" });
    }

    // Find the user's favorites first to check if the book exists
    const existingFavorite = await Favorite.findOne({ 
      userId, 
      'bookDetails.Title': title 
    });

    if (!existingFavorite) {
      return res.status(404).json({ 
        message: "Book not found in your favorites" 
      });
    }

    const result = await Favorite.findOneAndUpdate(
      { userId },
      { $pull: { bookDetails: { Title: title } } },
      { new: true }
    );

    res.status(200).json({ 
      success: true,
      message: "Book successfully removed from favorites", 
      favorites: result.bookDetails 
    });
  } catch (error) {
    console.error("Error removing favorite:", error);
    res.status(500).json({ 
      success: false,
      message: "Failed to remove book from favorites",
      error: error.message 
    });
  }
};

module.exports = { addFavorite, getFavorites, removeFavorite };