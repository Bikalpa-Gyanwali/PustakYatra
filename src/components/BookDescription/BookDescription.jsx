// book-description.jsx
import React from 'react';
import Book from '../../assets/Books/Godfather.png'
import { FaStar, FaUser } from 'react-icons/fa';

const BookDescription = () => {
  return (
    <div className="flex flex-col md:flex-row p-8 bg-white rounded-md shadow-md max-w-4xl mx-auto">
      {/* Book Image */}
      <div className="w-full md:w-1/3">
        <img
          src={Book} // replace with actual image URL
          alt="The Godfather Book Cover"
          className="rounded-lg shadow-lg"
        />
      </div>

      {/* Book Details */}
      <div className="w-full md:w-2/3 md:pl-8 mt-8 md:mt-0">
        <h2 className="text-3xl font-bold text-gray-900">The Godfather</h2>
        
        <div className="flex items-center mt-2">
          <FaUser className="text-gray-600" />
          <span className="ml-2 text-lg font-medium text-gray-700">Mario Puzo</span>
        </div>

        {/* Star Rating */}
        <div className="flex items-center mt-2">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className="text-yellow-500 mr-1" />
          ))}
        </div>

        {/* Description */}
        <p className="text-gray-700 mt-4">
          The Godfather, written by Mario Puzo, is a gripping tale of power, loyalty, and betrayal in the world of organized crime.
          It follows the Corleone family, led by the powerful Don Vito Corleone, as they navigate internal and external threats to
          their empire. <span className="text-blue-500 cursor-pointer">more...</span>
        </p>

        {/* Book Details (Format, Published, Language, Genres) */}
        <div className="mt-6 text-gray-800">
          <p><span className="font-semibold">Format:</span> 596 pages, Kindle Edition</p>
          <p><span className="font-semibold">Published:</span> March 5, 2019 by Berkley</p>
          <p><span className="font-semibold">Language:</span> English</p>
          <p><span className="font-semibold">Genres:</span> Fictions, Classics, Crime, Thriller, Mystery...</p>
        </div>
      </div>
    </div>
  );
};

export default BookDescription;
