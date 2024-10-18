import React from 'react'
import Navbar from "./components/Navbar/Navbar";
import Home from './components/Home/Home';
import About from './components/AboutUs/About';
import BestBooks from './components/BestBooks/BestBooks';

const App = () => {
  return (
    <>
    <div>
      <Navbar />
      <Home />
      <About />
      <BestBooks />
    </div>
    </>
  )
}

export default App
