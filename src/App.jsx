import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import About from './components/AboutUs/About';
import BestBooks from './components/BestBooks/BestBooks';
import Register from './components/RegisterForm/Register';
import Login from './components/RegisterForm/Login';
import Dashboard from './components/Dashboard/Dashboard';
import BookDetail from './components/Books/BookDetail';
import TopBooks from './components/Books/TopBooks';
import Footer from './components/Navbar/Footer';

const Layout = ({ children }) => {
  const location = useLocation();
  const excludeNavbarFooter = ['/dashboard', '/books'];


  return (
    <>
      {!excludeNavbarFooter.some((path) => location.pathname.startsWith(path)) && <Navbar />}
      {children}
      {!excludeNavbarFooter.some((path) => location.pathname.startsWith(path)) && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/best-books" element={<BestBooks />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/books/:bookId" element={<BookDetail />} />
          <Route path="/books/topbooks" element={<TopBooks />} />

          {/* Dashboard Route */}
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
