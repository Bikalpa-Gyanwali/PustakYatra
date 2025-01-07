import React, { useState } from 'react';
import { BiBook, BiTrendingUp, BiStar, BiTime, BiHeart } from 'react-icons/bi';

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    {
      id: 'fiction',
      name: 'Fiction',
      subCategories: ['Literary', 'Contemporary', 'Historical', 'Science Fiction', 'Fantasy'],
      icon: <BiBook size={24} />,
      count: 2547
    },
    {
      id: 'nonfiction',
      name: 'Non-Fiction',
      subCategories: ['Biography', 'Self-Help', 'Business', 'Science', 'History'],
      icon: <BiStar size={24} />,
      count: 1823
    },
    {
      id: 'trending',
      name: 'Trending Now',
      subCategories: ['New Releases', 'Award Winners', 'Bestsellers', 'Popular Series'],
      icon: <BiTrendingUp size={24} />,
      count: 156
    },
    {
      id: 'personal',
      name: 'For You',
      subCategories: ['Based on History', 'Similar to Favorites', 'Recommended'],
      icon: <BiHeart size={24} />,
      count: 42
    },
    {
      id: 'recent',
      name: 'Recently Viewed',
      subCategories: ['Last Week', 'Last Month'],
      icon: <BiTime size={24} />,
      count: 12
    }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Categories</h1>
          <p className="text-gray-600">
            Explore books across different genres and personalized recommendations
          </p>
        </div>

        <div className="grid gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer ${
                selectedCategory === category.id ? 'border-2 border-blue-500' : ''
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{category.name}</h3>
                    <p className="text-gray-500">{category.count} books</p>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {selectedCategory === category.id && 'Selected'}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                {category.subCategories.map((subCategory) => (
                  <span
                    key={subCategory}
                    className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-blue-100 hover:text-blue-600 transition-colors"
                  >
                    {subCategory}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Recommendation Insights Panel */}
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Recommendation Insights</h3>
          <div className="space-y-3 text-gray-700">
            <p className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span>Based on your reading history, you might enjoy Historical Fiction</span>
            </p>
            <p className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span>80% of users with similar preferences enjoyed Mystery novels</span>
            </p>
            <p className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span>Your sentiment analysis shows high interest in Self-Help books</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;