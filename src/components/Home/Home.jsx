import React, { useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import BannerCard from "./BannerCard";
import About from "../AboutUs/About";
import BestBooks from "../BestBooks/BestBooks";
import Testimonials from "../Testimonials/Testimonials";
import { useNavigate } from "react-router-dom";
import { SearchRoute } from "../../ApiRoute";

const Home = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 2) {
      try {
        const response = await axios.get(
          `${SearchRoute}?query=${encodeURIComponent(value)}&limit=10`
        );
        if (response.data && Array.isArray(response.data)) {
          setResults(response.data);
          setShowDropdown(true);
        } else {
          setResults([]);
          setShowDropdown(false);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
        setResults([]);
        setShowDropdown(false);
      }
    } else {
      setResults([]);
      setShowDropdown(false);
    }
  };

  const handleResultClick = (bookId) => {
    navigate(`/books/${bookId}`);
  };

  return (
    <div className="px-4 lg:px-24 flex flex-col items-center bg-white dark:bg-gray-900">
      {/* Main Home Section */}
      <div id="home" className="flex w-full flex-col md:flex-row justify-between items-center gap-12 py-40">
        {/* Left Side */}
        <div className="md:w-1/2 space-y-8 h-full">
          <h2 className="text-7xl font-bold leading-snug text-black dark:text-white">
            The more that you read,{" "}
            <span className="text-primary dark:text-secondary">
              the more things you will know
            </span>
          </h2>

          <div className="relative w-full md:w-96">
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Search a Book"
              value={query}
              onChange={handleInputChange}
              className="px-4 py-3 pr-12 rounded-md outline-none w-full shadow-md border border-gray-300 dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:border-primary dark:focus:border-secondary transition-all duration-200 ease-in"
            />
            <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-500 dark:text-gray-300 cursor-pointer hover:text-primary dark:hover:text-secondary transition-colors duration-200 ease-in" />

            {showDropdown && results.length > 0 && (
              <div className="absolute z-10 top-full left-0 w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md mt-2 shadow-lg max-h-60 overflow-y-auto">
                {results.map((book) => (
                  <div
                    key={book._id}
                    onClick={() => handleResultClick(book._id)}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {book.Title}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Side */}
        <div>
          <BannerCard />
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="py-40">
        <About />
      </div>

      {/* Best Books Section */}
      <div id="best-books" className="py-40">
        <BestBooks />
      </div>

      {/* Testimonials Section */}
      <div id="testimonials" className="py-40">
        <Testimonials />
      </div>
    </div>
  );
};

export default Home;
