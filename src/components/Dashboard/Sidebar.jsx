import React, { useState } from 'react';
import {
  BsGrid1X2Fill,
  BsFillGrid3X3GapFill,
  BsFillGearFill,
  BsFillPeopleFill,
  BsFillHouseDoorFill,
  BsBoxArrowRight,
} from 'react-icons/bs';
import { Link } from 'react-router-dom'; 
import './Dashboard.css';

function Sidebar() {
  const [profileImage, setProfileImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  return (
    <aside id="sidebar">
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <div className="profile-container">
            <img
              src={profileImage || 'https://via.placeholder.com/100'}
              alt="Profile"
              className="profile-image"
            />
            <label htmlFor="imageUpload" className="upload-label">
              Upload
            </label>
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              className="upload-input"
              onChange={handleImageUpload}
            />
          </div>
          <div className="username">User Name</div>
        </div>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <Link to="/dashboard">
            <BsGrid1X2Fill className="icon" /> Dashboard
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/dashboard/books">
            <BsFillHouseDoorFill className="icon" /> Top Picks For You
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/dashboard/categories">
            <BsFillGrid3X3GapFill className="icon" /> Categories
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/dashboard/communities">
            <BsFillPeopleFill className="icon" /> Communities
          </Link>
        </li>
        <li className="sidebar-list-item">
          <Link to="/dashboard/settings">
            <BsFillGearFill className="icon" /> Settings
          </Link>
        </li>
      </ul>

      <div className="sidebar-logout">
        <Link to="/logout">
          <BsBoxArrowRight className="icon" /> Logout
        </Link>
      </div>
    </aside>
  );
}

export default Sidebar;
