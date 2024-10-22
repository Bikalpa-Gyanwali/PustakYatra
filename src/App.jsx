import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import About from './components/AboutUs/About';
import BestBooks from './components/BestBooks/BestBooks';
import Register from './components/RegisterForm/Register';
import Login from './components/RegisterForm/Login';
import Dashboard from './components/Dashboard/Dashboard';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar /> {/* Navbar stays common */}
        <Routes>
          {/* Route to Home Page */}
          <Route path="/" element={<Home />} />
          {/* Route to Other Pages */}
          <Route path="/about" element={<About />} />
          <Route path="/best-books" element={<BestBooks />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path='/dashboard' element={<Dashboard/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
