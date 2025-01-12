import React, { useState, useEffect } from "react";
import {
  BiBookBookmark,
  BiGhost,
  BiBriefcaseAlt,
  BiCompass,
  BiBookOpen,
} from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const categories = [
    {
      id: "Fiction",
      name: "Fiction",
      subCategories: ["Mystery", "Fantasy", "Drama", "Romance", "Thriller"],
      icon: <BiBookBookmark size={28} />,
      count: 2547,
    },
    {
      id: "Non-fiction",
      name: "Non-fiction",
      subCategories: ["Biography", "Self-Help", "History", "Philosophy", "Science"],
      icon: <BiBookOpen size={28} />,
      count: 982,
    },
    {
      id: "Horror",
      name: "Horror",
      subCategories: ["Gothic", "Supernatural", "Psychological", "Paranormal"],
      icon: <BiGhost size={28} />,
      count: 1823,
    },
    {
      id: "Business",
      name: "Business",
      subCategories: [
        "Entrepreneurship",
        "Economics",
        "Leadership",
        "Marketing",
      ],
      icon: <BiBriefcaseAlt size={28} />,
      count: 156,
    },
    {
      id: "Adventure",
      name: "Adventure",
      subCategories: ["Exploration", "Survival", "Action", "Travel"],
      icon: <BiCompass size={28} />,
      count: 42,
    },
  ];
  


  const fetchBooksByCategory = async (category, subCategory) => {
    setLoading(true);
    try {
      const response = await axios.get("/book.json");
      const allBooks = response.data;
      const filteredBooks = allBooks.filter((book) => {
        if (subCategory) {
          return book.subCategory?.toLowerCase() === subCategory.toLowerCase();
        }
        return book.category?.toLowerCase() === category.toLowerCase();
      });
      setBooks(filteredBooks);
    } catch (error) {
      console.error("Error fetching books by category:", error);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  
  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedSubCategory(null);
    navigate(`/dashboard/categories/${categoryId}`);
  };
  
  const handleSubCategoryClick = (subCategory) => {
    setSelectedSubCategory(subCategory);
    navigate(`/dashboard/categories/${selectedCategory}/${subCategory}`);
  };
  

  const viewCategoryDetails = () => {
    navigate("/categorieslist", { state: { books, selectedCategory } });
  };

  return (
    <div className="p-10 bg-gradient-to-r from-blue-50 via-white to-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
            Explore Our Book Categories
          </h1>
          <p className="text-lg text-gray-600">
            Dive into a wide selection of genres and find your next read.
          </p>
        </div>
        {loading ? (
          <div className="flex items-center justify-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <div
                key={category.id}
                className={`relative bg-white shadow-md rounded-xl overflow-hidden transform transition-transform hover:scale-105 hover:shadow-lg cursor-pointer ${
                  selectedCategory === category.id
                    ? "border-4 border-blue-500"
                    : ""
                }`}
                onClick={() => handleCategoryClick(category.id)}
              >
                <div className="p-6 bg-gradient-to-r from-blue-50 to-white flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-4 bg-blue-100 text-blue-700 rounded-lg">
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-800">
                        {category.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {category.count} books
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2">
                    {category.subCategories.map((subCategory) => (
                      <span
                        key={subCategory}
                        className={`px-4 py-2 text-sm rounded-full font-medium transition-colors ${
                          selectedSubCategory === subCategory
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-blue-100 hover:text-blue-600"
                        } cursor-pointer`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSubCategoryClick(subCategory);
                        }}
                      >
                        {subCategory}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="mt-16 text-center">
          <button
            className={`py-4 px-10 text-lg font-bold rounded-lg shadow-md ${
              books.length
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            onClick={viewCategoryDetails}
            disabled={!books.length}
          >
            View Selected Books
          </button>
        </div>
      </div>
    </div>
  );
};

export default Categories;