import React from 'react'
import Img2 from '../../assets/Books/book1.jpg';
import Img1 from '../../assets/Books/book2.jpg';
import Img3 from '../../assets/Books/book3.jpg';
import { FaStar } from "react-icons/fa";


const ServicesData = [
    {
      id: 1,
      img: Img1,
      title: "His Life",
      description: "The description is here ",
    },
    {
      id: 2,
      img: Img2,
      title: "Who's there",
      description: "The description is here ",
    },
    {
      id: 3,
      img: Img3,
      title: "Lost Boy",
      description: "The description is here ", 
   },
  ];

  const BestBooks = ({ handleOrderPopup }) => {
    return (
      <>
        <span id="services"></span>
        <div className="py-10 dark:bg-gray-900">
          <div className="container">
            <div className="text-center mb-20 max-w-[400px] mx-auto">
              <p className="text-sm bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary ">
                Trending Books
              </p>
              <h1 className="text-3xl font-bold  dark:text-white">Best Books</h1>
              <p className="text-xs text-gray-400">
                Explore our handpicked selection of the best books across various genres. 
                Whether you're looking for timeless classics or modern-day masterpieces, 
                these books are sure to captivate, inspire, and entertain.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12  place-items-center">
              {ServicesData.map((service) => (
                <div
                  key={service.id}
                  className="rounded-2xl bg-white dark:bg-gray-800 hover:bg-primary dark:hover:bg-primary hover:text-white relative shadow-xl duration-high group max-w-[300px]"
                >
                  <div className="h-[100px]">
                    <img
                      src={service.img}
                      alt={service.title}
                      className="max-w-[100px] block mx-auto transform -translate-y-12
                    group-hover:scale-110 duration-500 shadow-md"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <div className="flex justify-center mb-3">
                      <FaStar className="text-yellow-500" />
                      <FaStar className="text-yellow-500" />
                      <FaStar className="text-yellow-500" />
                      <FaStar className="text-yellow-500" />
                    </div>
                    <h1 className="text-xl font-bold  dark:text-white">{service.title}</h1>
                    <p className="text-black font-medium dark:text-white group-hover:text-white duration-300 text-sm line-clamp-2">
                      {service.description}
                    </p>
                    <button
                      className="bg-primary hover:scale-105 duration-300 text-white py-2 px-5 rounded-full mt-4 group-hover:bg-white group-hover:text-primary"
                      onClick={handleOrderPopup}
                    >
                      Read More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default BestBooks;