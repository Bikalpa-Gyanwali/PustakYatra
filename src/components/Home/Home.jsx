import React from 'react';
import { FaSearch } from "react-icons/fa";
import BannerCard from './BannerCard';

const Home = () => {
  return (
    <div className='px-4 lg:px-24 flex items-center bg-white dark:bg-gray-900'> {/* Set the background color for both modes */}
        <div className='flex w-full flex-col md:flex-row justify-between items-center gap-12 py-40'>
            {/* Left Side */}
            <div className='md:w-1/2 space-y-8 h-full'>
                <h2 className='text-7xl font-bold leading-snug text-black dark:text-white'>
                  The more that you read, <span className='text-primary dark:text-secondary'>
                  the more things you will know</span>
                </h2>

                <div className="relative w-full md:w-96">
                    <input
                        type="search"
                        name="search"
                        id="search"
                        placeholder="Search a Book"
                        className="px-4 py-3 pr-12 rounded-md outline-none w-full shadow-md border border-gray-300 dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:border-primary dark:focus:border-secondary transition-all duration-200 ease-in"
                    />
                    <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-500 dark:text-gray-300 cursor-pointer hover:text-primary dark:hover:text-secondary transition-colors duration-200 ease-in" />
                </div>

            </div>

            {/* Right Side */}
            <div>
                <BannerCard/>
            </div>
            
        </div>
    </div>
  );
}

export default Home;
