import React from 'react'
import Logo from "../../assets/website/logo.png";
import DarkMode from './DarkMode';
import { MdLogin } from "react-icons/md";
import { FaCaretDown } from "react-icons/fa";

const Menu = [
    {
      id: 1,
      name: "Home",
      link: "/#",
    },
    {
      id: 2,
      name: "Categories",
      link: "/#categories",
    },
  ];

  const DropdownLinks = [
    {
      name: "Trending Books",
      link: "/#",
    },
    {
      name: "Best Selling",
      link: "/#",
    },
    {
      name: "Authors",
      link: "/#",
    },
  ];
  

const Navbar = () => {
  return (
    <>
    <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200">
      <div className="container py-3 sm:py-0">
        <div className="flex justify-between items-center">
            <div>
            <a href="#" className="font-bold text-2xl sm:text-3xl flex gap-2">
                <img src={Logo} alt="Logo" className="w-10" />
                PustakYatra
            </a>
        </div>

        <div className="flex justify-between items-center gap-4">
              <div>
                <DarkMode />
              </div>
              
            <ul className="hidden sm:flex items-center gap-4">
                {Menu.map((menu) => (
                    <li key={menu.id}>
                        <a
                        href={menu.link}
                        className="inline-block py-4 px-4 hover:text-primary duration-200"
                        >
                        {menu.name}
                        </a>
                    </li>
                    ))}
                {/* Dropdown Section */} 
                <li className="group relative cursor-pointer">
                    <a href="/#home" className="flex h-[72px] items-center gap-[2px]">
                        Quick Links{" "}
                        <span>
                        <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
                        </span>
                    </a>
                {/* Dropdown Link section */} 

                    <div className="absolute -left-9 z-[9999] hidden w-[150px] rounded-md bg-white p-2 text-black group-hover:block  ">
                    <ul className="space-y-3">
                      {DropdownLinks.map((data) => (
                        <li key={data.name}>
                          <a
                            className="inline-block w-full rounded-md p-2 hover:bg-primary/20"
                            href={data.link}
                          >
                            {data.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>

            </ul>
                {/* Login Button section */} 
                <button 
                    className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-1 px-4 rounded-full flex items-center gap-3"

                >
                Order
                <MdLogin className="text-xl text-white drop-shadow-sm cursor-pointer" />
                </button>

        </div>

        </div>
      </div>
    </div>
    </>
  );
}

export default Navbar
