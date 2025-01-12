import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa"; // Star icon for ratings
import { Link } from "react-router-dom"; // Link for navigation
import Slider from "react-slick"; // React Slick carousel for book slider
import "slick-carousel/slick/slick.css"; // Carousel style imports
import "slick-carousel/slick/slick-theme.css"; // Carousel theme style imports
import { getImgUrl } from "../../utils/getImgUrl"; // Utility function for dynamic image URL

const BestBooks = ({ handleOrderPopup }) => {
  const [books, setBooks] = useState([]); // State to store all books
  const [filteredBooks, setFilteredBooks] = useState([]); // State to store filtered books based on genre
  const [genre, setGenre] = useState("All"); // State for selected genre

  // Fetch the books data from the local JSON file
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("/book.json"); // Adjust path if needed
        const data = await response.json(); // Parse JSON data
        const trendingBooks = data.filter((book) => book.trending === true); // Filter trending books
        setBooks(trendingBooks); // Set the books state with trending books
        setFilteredBooks(trendingBooks); // Set the filtered books initially as all trending books
      } catch (error) {
        console.error("Error fetching books:", error); // Handle any errors during fetch
      }
    };

    fetchBooks(); // Fetch books on component mount
  }, []);

  // Handle genre selection from the dropdown
  const handleGenreChange = (event) => {
    const selectedGenre = event.target.value;
    if (selectedGenre === genre) return; // Avoid unnecessary updates if genre is unchanged

    setGenre(selectedGenre); // Update genre state
    setFilteredBooks(
      selectedGenre === "All" 
        ? books // If "All" selected, show all books
        : books.filter((book) => book.category.toLowerCase() === selectedGenre.toLowerCase()) // Filter books by genre
    );
  };

  // React Slick carousel settings for responsive layout and transitions
  const sliderSettings = {
    dots: true, // Display dots for navigation
    infinite: true, // Infinite scrolling
    speed: 500, // Slide transition speed
    slidesToShow: 3, // Number of slides to show at once
    slidesToScroll: 1, // Number of slides to scroll at once
    responsive: [
      {
        breakpoint: 1024, // On smaller screens (1024px width or less)
        settings: { slidesToShow: 2, slidesToScroll: 1 }, // Show 2 slides
      },
      {
        breakpoint: 768, // On very small screens (768px width or less)
        settings: { slidesToShow: 1, slidesToScroll: 1 }, // Show 1 slide
      },
    ],
  };

  return (
    <>
      <span id="services"></span> {/* For smooth scrolling to this section */}
      <div className="py-10 dark:bg-gray-900">
        <div className="container">
          {/* Title and Description */}
          <div className="text-center mb-10 max-w-[400px] mx-auto">
            <p className="text-sm bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Trending Books
            </p>
            <h1 className="text-3xl font-bold dark:text-white">Best Books</h1>
            <p className="text-xs text-gray-400">
              Explore our handpicked selection of the best books across various genres.
              Whether you're looking for timeless classics or modern-day masterpieces,
              these books are sure to captivate, inspire, and entertain.
            </p>
          </div>

          {/* Genre Dropdown */}
          <div className="text-center mb-6">
            <select
              className="py-2 px-4 rounded-md border dark:border-gray-700 text-gray-700 dark:text-gray-300"
              value={genre}
              onChange={handleGenreChange} // Update genre on selection
            >
              <option value="All">All Genres</option>
              <option value="fiction">Fiction</option>
              <option value="business">Business</option>
              <option value="adventure">Adventure</option>
              <option value="horror">Horror</option>
              <option value="non-fiction">Non-Fiction</option>
              
            </select>
          </div>

          {/* Books Carousel */}
          <Slider {...sliderSettings}>
            {filteredBooks.map((book) => (
              <div key={book._id} className="px-4">
                <div className="rounded-2xl bg-white dark:bg-gray-800 hover:bg-primary dark:hover:bg-primary hover:text-white relative shadow-xl duration-high group">
                  {/* Book Cover */}
                  <div className="h-[200px] flex items-center justify-center">
                    <img
                      src={`${getImgUrl(book.coverImage)}`} // Dynamically fetch image using utility function
                      alt={book.title}
                      className="max-h-[180px] block mx-auto transform group-hover:scale-110 duration-500 shadow-md"
                    />
                  </div>

                  {/* Book Details */}
                  <div className="p-6 text-center">
                    {/* Rating Stars */}
                    <div className="flex justify-center mb-3">
                      {[...Array(4)].map((_, index) => (
                        <FaStar key={index} className="text-yellow-500" /> // Display 4 stars for rating
                      ))}
                    </div>
                    <h1 className="text-xl font-bold dark:text-white">{book.title}</h1>
                    <p className="text-black font-medium dark:text-white group-hover:text-white duration-300 text-sm line-clamp-2">
                      {book.description} {/* Display book description */}
                    </p>

                    {/* Read More Button */}
                    <Link to="/book-description">
                      <button
                        className="bg-primary hover:scale-105 duration-300 text-white py-2 px-5 rounded-full mt-4 group-hover:bg-white group-hover:text-primary"
                        onClick={handleOrderPopup} // Trigger the popup when "Read More" is clicked
                      >
                        Read More
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default BestBooks;
