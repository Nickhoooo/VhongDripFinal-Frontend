import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import LandingPage from '../src/Pages/LandingPage';
import Drops from '../src/Pages/Drops';
import Contact from '../src/Pages/Contact';
import Products from '../src/Pages/Products';
import Header from './Components/Header/Header';
import Company from './Pages/Company';
import About from './Pages/About';
import Footer from './Components/Footer/Footer';
import HomePage from './Pages/HomePage';
import Cart from './Pages/Cart';
import LogIn from './Pages/LogIn';
import SignUp from './Pages/SignUp';
import DetailsProduct from "../src/Components/ProductDetails/ProductDetails"

//Dto nmn yung routes kumbaga eto yung cable sa netwrok para mag connect sila

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path='/home' element={<HomePage/>}/>
        <Route path="/drops" element={<Drops />} />     
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<LogIn />}/>
        <Route path='/signup' element={<SignUp/>}/>
      
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/company' element={<Company/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path="/contact" element={<Contact />} />

        <Route path="/product/:id" element={<DetailsProduct/>}/>
    
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
