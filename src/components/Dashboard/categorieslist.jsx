import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { getImgUrl } from "../../utils/getImgUrl";

const CategoriesList = () => {
  const { categoryId, subCategory } = useParams();
  const [books, setBooks] = useState([]); // All books
  const [loading, setLoading] = useState(false); // Loading state
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const booksPerPage = 6; // Books per page

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await fetch("/book.json");
        const data = await response.json();
        const filteredBooks = data.filter((book) => {
          if (subCategory) {
            return book.subCategory?.toLowerCase() === subCategory.toLowerCase();
          }
          return book.category?.toLowerCase() === categoryId.toLowerCase();
        });
        setBooks(filteredBooks);
      } catch (error) {
        console.error("Error fetching books:", error);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [categoryId, subCategory]);

  // Pagination logic
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  const totalPages = Math.ceil(books.length / booksPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="py-10 dark:bg-gray-900">
      <div className="container">
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
        ) : currentBooks.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {currentBooks.map((book) => (
                <div key={book._id} className="px-4">
                  <div className="rounded-2xl bg-white dark:bg-gray-800 hover:bg-primary dark:hover:bg-primary hover:text-white relative shadow-xl duration-high group">
                    <div className="h-[200px] flex items-center justify-center">
                      <img
                        src={`${getImgUrl(book.coverImage)}`}
                        alt={book.title}
                        className="max-h-[180px] block mx-auto transform group-hover:scale-110 duration-500 shadow-md"
                      />
                    </div>
                    <div className="p-6 text-center">
                      <div className="flex justify-center mb-3">
                        {[...Array(4)].map((_, index) => (
                          <FaStar key={index} className="text-yellow-500" />
                        ))}
                      </div>
                      <h1 className="text-xl font-bold dark:text-white">{book.title}</h1>
                      <p className="text-black font-medium dark:text-white group-hover:text-white duration-300 text-sm line-clamp-2">
                        {book.description}
                      </p>
                      <button className="bg-primary hover:scale-105 duration-300 text-white py-2 px-5 rounded-full mt-4 group-hover:bg-white group-hover:text-primary">
                        Read More
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-10 space-x-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === index + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-blue-100"
                  }`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </>
        ) : (
          <p className="text-center text-gray-500">No books found for this category.</p>
        )}
      </div>
    </div>
  );
};

export default CategoriesList;
