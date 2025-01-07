import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../Dashboard/Sidebar';
import Recommend from '../Books/Recommend';
import BookList from '../Books/Books';
import Home from '../Dashboard/Home';
import './Dashboard.css';
import Categories from '../Dashboard/Categories';

const Dashboard = () => {
  return (
    <div className="dashboard-container flex flex-col lg:flex-row">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="main-content flex-1 p-6 bg-gray-100">
        {/* Routes for Dashboard */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<BookList />} />
          <Route path="/recommend" element={<Recommend />} />
          <Route path="/categories" element={<Categories />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;