import React from 'react';
import { FaSearch } from "react-icons/fa";
import FavBook from '../../assets/Books/favoritebook.jpg';

const About = () => {
  return (
    <div className='px-4 bg-white dark:bg-gradient-to-b from-gray-800 to-gray-900 lg:px-24 my-20 flex flex-col md:flex-row justify-between items-center gap-12 transition-all duration-300 ease-in-out'>
      <div className='md:w-1/2 '>
        <img src={FavBook} alt='' className='rounded-lg md:w-10/12 shadow-lg' />
      </div>

      <div className='md:w-1/2 space-y-6'>
        <h2 className='text-3xl font-extrabold my-5 dark:text-gray-200'>About Us</h2>
        <h2 className='text-5xl font-bold my-4 md:w-3/4 dark:text-white leading-snug'>
          Find Your Favourite <span className='text-primary dark:text-secondary'>Book Here !</span>
        </h2>

        <div className='flex flex-col sm:flex-row justify-between gap-6 md:w-3/4 my-14'>
          <div className='text-center'>
            <h3 className='text-4xl font-extrabold text-primary dark:text-secondary'>800+</h3>
            <p className='text-base dark:text-gray-300'>Book Listing</p>
          </div>

          <div className='text-center'>
            <h3 className='text-4xl font-extrabold text-primary dark:text-secondary'>150+</h3>
            <p className='text-base dark:text-gray-300'>Registered Users</p>
          </div>

          <div className='text-center'>
            <h3 className='text-4xl font-extrabold text-primary dark:text-secondary'>400+</h3>
            <p className='text-base dark:text-gray-300'>Anything XYZ</p>
          </div>
        </div>

        <div className='relative w-full md:w-96'>
          <input
            type='search'
            name='search'
            id='search'
            placeholder='Search a Book'
            className='px-4 py-3 pr-12 rounded-lg outline-none w-full shadow-md border border-primary dark:bg-gray-800 dark:border-secondary dark:text-white focus:border-primary dark:focus:border-secondary transition-all duration-200 ease-in'
          />
          <FaSearch className='absolute right-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-500 dark:text-gray-300 cursor-pointer hover:text-primary dark:hover:text-secondary transition-colors duration-200 ease-in' />
        </div>
      </div>
    </div>
  );
};

export default About;
