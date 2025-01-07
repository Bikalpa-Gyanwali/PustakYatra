import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from "../../assets/website/logo.png";
import DarkMode from './DarkMode';
import { MdLogin } from "react-icons/md";
import { FaCaretDown } from "react-icons/fa";

// Menu for Routing to different pages
const Menu = [
  {
    id: 1,
    name: "Home",
    link: "/#",
  },
  {
    id: 2,
    name: "About",
    link: "/about", // Direct routing
  },
];

// Dropdown links (for sections in the home page)
const DropdownLinks = [
  {
    name: "Best Selling",
    link: "/#best-books", // Direct routing
  },
  {
    name: "Trending Books",
    link: "/#trending", // Anchor to Trending Books section in Home page
  },
  {
    name: "Categories",
    link: "/#categories", // Anchor to Categories section in Home page
  },
];

const Navbar = () => {
  const location = useLocation();

  // Don't show Navbar on specific routes
  const excludedRoutes = ["/dashboard"];
  if (excludedRoutes.includes(location.pathname)) {
    return null;
  }

  const handleScroll = (e, section) => {
    // If we're on the home page, scroll to section
    if (location.pathname === "/") {
      e.preventDefault();
      const target = document.getElementById(section);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200">
      <div className="container py-3 sm:py-0">
        <div className="flex justify-between items-center">
          <div>
            <Link to="/" className="font-bold text-2xl sm:text-3xl flex gap-2">
              <img src={Logo} alt="Logo" className="w-10" />
              PustakYatra
            </Link>
          </div>

          <div className="flex justify-between items-center gap-4">
            <div>
              <DarkMode />
            </div>

            <ul className="hidden sm:flex items-center gap-4">
              {Menu.map((menu) => (
                <li key={menu.id}>
                  <Link
                    to={menu.link}
                    className="inline-block py-4 px-4 hover:text-primary duration-200"
                  >
                    {menu.name}
                  </Link>
                </li>
              ))}

              {/* Dropdown Section */}
              <li className="group relative cursor-pointer">
                <Link to="/#" className="flex h-[72px] items-center gap-[2px]">
                  Quick Links{" "}
                  <span>
                    <FaCaretDown className="transition-all duration-200 group-hover:rotate-180" />
                  </span>
                </Link>

                {/* Dropdown Links */}
                <div className="absolute -left-9 z-[9999] hidden w-[150px] rounded-md bg-white p-2 text-black group-hover:block">
                  <ul className="space-y-3">
                    {DropdownLinks.map((data) => (
                      <li key={data.name}>
                        <Link
                          to={data.link}
                          onClick={(e) =>
                            handleScroll(e, data.link.replace("/#", ""))
                          }
                          className="inline-block w-full rounded-md p-2 hover:bg-primary/20"
                        >
                          {data.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </ul>

            {/* Register Button */}
            <Link
              to="/register"
              className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-1 px-4 rounded-full flex items-center gap-3"
            >
              Register
              <MdLogin className="text-xl text-white drop-shadow-sm cursor-pointer" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
