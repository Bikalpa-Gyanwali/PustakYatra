import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa"; // Star icon for ratings
import { getImgUrl } from "../../utils/getImgUrl"; // Utility function for dynamic image URL

const CategoriesList = () => {
  const { categoryId, subCategory } = useParams();
  const [books, setBooks] = useState([]); // State for filtered books
  const [loading, setLoading] = useState(false); // State for loading indicator

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true); // Start loading
      try {
        const response = await fetch("/book.json"); // Fetch books data
        const data = await response.json(); // Parse JSON data
        const filteredBooks = data.filter((book) => {
          if (subCategory) {
            return book.subCategory?.toLowerCase() === subCategory.toLowerCase();
          }
          return book.category?.toLowerCase() === categoryId.toLowerCase();
        });
        setBooks(filteredBooks); // Set filtered books
      } catch (error) {
        console.error("Error fetching books:", error); // Handle errors
        setBooks([]);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchBooks(); // Fetch books on component mount
  }, [categoryId, subCategory]);

  return (
    <div className="py-10 dark:bg-gray-900">
      <div className="container">
        {/* Title */}
        <div className="text-center mb-10 max-w-[400px] mx-auto">
          <h1 className="text-3xl font-bold dark:text-white">
            {subCategory ? `${subCategory} Books` : `${categoryId} Books`}
          </h1>
          <p className="text-xs text-gray-400">
            Explore our curated collection of books from the {subCategory || categoryId} genre.
          </p>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : books.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {books.map((book) => (
              <div key={book._id} className="px-4">
                <div className="rounded-2xl bg-white dark:bg-gray-800 hover:bg-primary dark:hover:bg-primary hover:text-white relative shadow-xl duration-high group">
                  {/* Book Cover */}
                  <div className="h-[200px] flex items-center justify-center">
                    <img
                      src={`${getImgUrl(book.coverImage)}`}
                      alt={book.title}
                      className="max-h-[180px] block mx-auto transform group-hover:scale-110 duration-500 shadow-md"
                    />
                  </div>

                  {/* Book Details */}
                  <div className="p-6 text-center">
                    {/* Rating Stars */}
                    <div className="flex justify-center mb-3">
                      {[...Array(4)].map((_, index) => (
                        <FaStar key={index} className="text-yellow-500" />
                      ))}
                    </div>
                    <h1 className="text-xl font-bold dark:text-white">{book.title}</h1>
                    <p className="text-black font-medium dark:text-white group-hover:text-white duration-300 text-sm line-clamp-2">
                      {book.description}
                    </p>

                    {/* Read More Button */}
                    <button
                      className="bg-primary hover:scale-105 duration-300 text-white py-2 px-5 rounded-full mt-4 group-hover:bg-white group-hover:text-primary"
                    >
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No books found for this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategoriesList;
