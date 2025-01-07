import React, { useEffect, useState } from 'react';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsHeartFill } from 'react-icons/bs';
import Recommend from '../Books/Recommend';

function Home() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('username');
    if (storedUser) {
      setUsername(storedUser);
    }
  }, []);

  return (
    <main className="main-container">
      <div className="welcome-section mb-8">
        <h3 className="welcome-title text-black text-2xl font-bold">Welcome Back, {username || 'User'}!</h3>
        <p className="welcome-subtitle text-gray-600 text-lg">Here’s a quick overview of your profile.</p>
      </div>

      <div className="search-bar-container mb-8">
        <Recommend />
      </div>

      <div className="main-cards">
        <div className="card">
          <div className="card-inner">
            <h3>Books Read</h3>
            <BsFillArchiveFill className="card-icon" />
          </div>
          <h1>52</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>Genres Explored</h3>
            <BsFillGrid3X3GapFill className="card-icon" />
          </div>
          <h1>15</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>Favorites</h3>
            <BsHeartFill className="card-icon" />
          </div>
          <h1>8</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>Wishlist</h3>
            <BsHeartFill className="card-icon" />
          </div>
          <h1>20</h1>
        </div>
      </div>

      <div className="recent-activities mt-8">
        <h3 className="text-black text-xl font-semibold">Recent Activities</h3>
        <ul className="list-disc ml-5 text-gray-700">
          <li>You finished "The Alchemist" on Dec 27, 2024.</li>
          <li>Added "Atomic Habits" to your Wishlist.</li>
          <li>Rated "Sapiens" 4.5 stars.</li>
        </ul>
      </div>

      <div className="favorite-genres mt-8">
        <h3 className="text-black text-xl font-semibold">Favorite Genres</h3>
        <p className="text-gray-700">Fiction, Self-Help, Mystery, Science Fiction</p>
      </div>
    </main>
  );
}

export default Home;