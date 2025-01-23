import React, { useEffect, useState } from 'react';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsHeartFill, BsBookmarkFill, BsTrash } from 'react-icons/bs';
import { GetWishlistRoute, RemoveWishlistRoute, GetFavoritesRoute, RemoveFavoriteRoute } from '../../ApiRoute';
import Recommend from '../Books/Recommend';

function Home() {
  const [username, setUsername] = useState('');
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [wishlistBooks, setWishlistBooks] = useState([]);
  const [isWishlistLoading, setIsWishlistLoading] = useState(true);
  const [isFavoritesLoading, setIsFavoritesLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    fetchWishlistBooks();
  }, []);

  const fetchWishlistBooks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(GetWishlistRoute, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      setWishlistBooks(data.wishlist || []);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setIsWishlistLoading(false);
    }
  };

  const handleRemoveFromWishlist = async (title) => {
    // Add confirmation dialog
    if (!window.confirm('Are you sure you want to remove this book from your wishlist?')) {
      return;
    }
  
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${RemoveWishlistRoute}/${encodeURIComponent(title)}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      if (response.ok) {
        setWishlistBooks(prev => prev.filter(book => book.Title !== title));
        alert('Book successfully removed from wishlist!');
      } else {
        const data = await response.json();
        throw new Error(data.message || 'Failed to remove book from wishlist');
      }
    } catch (error) {
      console.error('Error removing book:', error);
      alert(error.message);
    }
  };
  
  const handleRemoveFromFavorites = async (title) => {
    // Add confirmation dialog
    if (!window.confirm('Are you sure you want to remove this book from your favorites?')) {
      return;
    }
  
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${RemoveFavoriteRoute}/${encodeURIComponent(title)}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
  
      if (response.ok) {
        setFavoriteBooks(prev => prev.filter(book => book.Title !== title));
        alert('Book successfully removed from favorites!');
      } else {
        const data = await response.json();
        throw new Error(data.message || 'Failed to remove book from favorites');
      }
    } catch (error) {
      console.error('Error removing favorite:', error);
      alert(error.message);
    }
  };
  
  // Modify the existing useEffect that fetches favorites to include the loading state
  useEffect(() => {
    const storedUser = localStorage.getItem('username');
    if (storedUser) {
      setUsername(storedUser);
    }
  
    const fetchFavorites = async () => {
      setIsFavoritesLoading(true);
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(GetFavoritesRoute, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setFavoriteBooks(data.favorites || []);
      } catch (error) {
        console.error('Error fetching favorites:', error);
      } finally {
        setIsFavoritesLoading(false);
        setIsLoading(false);
      }
    };
  
    fetchFavorites();
  }, []);



  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(GetWishlistRoute, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setWishlistBooks(data.wishlist || []);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  };

  fetchWishlist();  



  return (
    <main className="main-container bg-gray-100 p-6">
      {/* Welcome Section */}
      <div className="welcome-section bg-white rounded-lg p-6 shadow-md mb-8">
        <h3 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome Back, {username || 'Reader'}! 📚
        </h3>
        <p className="text-gray-600">
          Continue your reading journey and explore new books.
        </p>
      </div>

      {/* Search Section */}
      <div className="search-section bg-white rounded-lg p-6 shadow-md mb-8">
        <h4 className="text-xl font-semibold text-gray-800 mb-4">
          Discover New Books
        </h4>
        <Recommend />
      </div>

      {/* Stats Cards */}
      <div className="main-cards">
        <div className="card cursor-pointer transform hover:scale-105 transition-transform duration-200">
          <div className="card-inner">
            <h3>Books Read</h3>
            <BsFillArchiveFill className="card-icon" />
          </div>
          <h1>52</h1>
        </div>

        <div className="card cursor-pointer transform hover:scale-105 transition-transform duration-200">
          <div className="card-inner">
            <h3>Genres Explored</h3>
            <BsFillGrid3X3GapFill className="card-icon" />
          </div>
          <h1>15</h1>
        </div>

        {/* Favorites Card */}
        <div 
          className="card favorites-card cursor-pointer transform hover:scale-105 transition-transform duration-200"
          onClick={() => setShowFavorites(!showFavorites)}
        >
          <div className="card-inner">
            <h3>Favorites</h3>
            <BsHeartFill className="card-icon" />
          </div>
          <h1>{favoriteBooks.length}</h1>
        </div>

        {/* Wishlist Card */}
        <div 
          className="card wishlist-card cursor-pointer transform hover:scale-105 transition-transform duration-200"
          onClick={() => setShowWishlist(!showWishlist)}
        >
        <div className="card-inner">
          <h3>Reading List</h3>
          <BsBookmarkFill className="card-icon" />
        </div>
        <h1>{wishlistBooks.length}</h1>
      </div>
      </div>

      {/* Favorites Expanded View */}
      {showFavorites && (
        <div className="favorites-expanded mt-8">
          <div className="bg-white rounded-lg shadow-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Your Favorite Books ({favoriteBooks.length})
              </h2>
              <button 
                onClick={() => setShowFavorites(false)}
                className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"
              >
                ✕
              </button>
            </div>

            {isFavoritesLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
              </div>
            ) : favoriteBooks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteBooks.map((book, index) => (
                  <div 
                    key={index} 
                    className="book-card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative h-48 group">
                      <img 
                        src={book.ImageURLS || '/default-book-cover.jpg'} 
                        alt={book.Title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-white font-semibold text-lg line-clamp-2">
                          {book.Title}
                        </h3>
                      </div>
                    </div>
                    <div className="p-4 space-y-3">
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600 font-medium">
                          {book.BookAuthor?.join(', ')}
                        </p>
                        <p className="text-xs text-gray-500">
                          {book.Publisher} • {book.YearOfPublication}
                        </p>
                      </div>
                      {book.categories?.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {book.categories.slice(0, 2).map((category, idx) => (
                            <span 
                              key={idx}
                              className="px-2 py-1 text-xs bg-pink-100 text-pink-600 rounded-full"
                            >
                              {category}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="flex justify-between items-center pt-2">
                        {book.previewLink && (
                          <a 
                            href={book.previewLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-pink-500 hover:text-pink-700 text-sm font-medium flex items-center gap-1"
                          >
                            Preview →
                          </a>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveFromFavorites(book.Title);
                          }}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors duration-200"
                          title="Remove from favorites"
                        >
                          <BsTrash size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <BsHeartFill size={48} className="mx-auto" />
                </div>
                <h3 className="text-xl font-medium text-gray-600 mb-2">
                  No favorite books yet
                </h3>
                <p className="text-gray-500">
                  Start adding books to your favorites!
                </p>
              </div>
            )}
          </div>
        </div>
      )}

            {/* Wishlist Expanded View */}
        {showWishlist && (
        <div className="wishlist-expanded mt-8">
          <div className="bg-white rounded-lg shadow-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Your Reading List ({wishlistBooks.length} books)
              </h2>
              <button 
                onClick={() => setShowWishlist(false)}
                className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"
              >
                ✕
              </button>
            </div>

            {isWishlistLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
              </div>
            ) : wishlistBooks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistBooks.map((book, index) => (
                  <div 
                    key={index} 
                    className="book-card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                  >
                    <div className="relative h-48 group">
                      <img 
                        src={book.ImageURLS || '/default-book-cover.jpg'} 
                        alt={book.Title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <h3 className="text-white font-semibold text-lg line-clamp-2">
                          {book.Title}
                        </h3>
                      </div>
                    </div>
                    <div className="p-4 space-y-3">
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600 font-medium">
                          {book.BookAuthor?.join(', ')}
                        </p>
                        <p className="text-xs text-gray-500">
                          {book.Publisher} • {book.YearOfPublication}
                        </p>
                      </div>
                      {book.categories?.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {book.categories.slice(0, 2).map((category, idx) => (
                            <span 
                              key={idx}
                              className="px-2 py-1 text-xs bg-purple-100 text-purple-600 rounded-full"
                            >
                              {category}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="flex justify-between items-center pt-2">
                        {book.previewLink && (
                          <a 
                            href={book.previewLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-500 hover:text-purple-700 text-sm font-medium flex items-center gap-1"
                          >
                            Preview →
                          </a>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveFromWishlist(book.Title);
                          }}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors duration-200"
                          title="Remove from wishlist"
                        >
                          <BsTrash size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <BsBookmarkFill size={48} className="mx-auto" />
                </div>
                <h3 className="text-xl font-medium text-gray-600 mb-2">
                  Your reading list is empty
                </h3>
                <p className="text-gray-500">
                  Start adding books you want to read later!
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Recent Activities Section */}
      <div className="recent-activities mt-8 bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Recent Activities
        </h3>
        <div className="space-y-4">
          {[
            { action: "Finished reading", book: "The Alchemist", date: "2024-12-27" },
            { action: "Added to Wishlist", book: "Atomic Habits", date: "2024-12-26" },
            { action: "Rated 4.5 stars", book: "Sapiens", date: "2024-12-25" }
          ].map((activity, index) => (
            <div 
              key={index}
              className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              <div className="flex-1">
                <p className="text-gray-700">
                  {activity.action} "{activity.book}"
                </p>
                <p className="text-sm text-gray-500">
                  {formatDate(activity.date)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reading Stats Section */}
      <div className="reading-stats mt-8 bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Reading Statistics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-700 mb-2">
              Favorite Genres
            </h4>
            <div className="flex flex-wrap gap-2">
              {['Fiction', 'Self-Help', 'Mystery', 'Science Fiction'].map((genre, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-700 mb-2">
              Reading Goals
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Books this year</span>
                <span className="font-medium">52/100</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: '52%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;