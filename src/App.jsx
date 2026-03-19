import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from '../src/Pages/LandingPage';
import Drops from '../src/Pages/Drops';
import Contact from '../src/Pages/Contact';
import Products from '../src/Pages/Products';
import Company from './Pages/Company';
import About from './Pages/About';
import HomePage from './Pages/HomePage';
import Cart from './Pages/Cart';
import LogIn from './Pages/LogIn';
import SignUp from './Pages/SignUp';
import DetailsProduct from "../src/Components/ProductDetails/ProductDetails"
import DropDetails from './Components/DropDetails/DropDetails';
import Dashboard from './admin/Dashboard';
import ManageProduct from './admin/ManageProduct';
import PaymentVerification from './admin/PaymentVerification';
import Users from './admin/Users';

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

        {/**ADMIN ROUTE TO MGA YAH */}
        <Route path='/admin' element={<Dashboard />}/>
        <Route path='/manage' element={<ManageProduct />}/>
        <Route path='/payment' element={<PaymentVerification />}/>
        <Route path='/users' element={<Users />}/>
        {/*========================*/}

        <Route path="/product/:id" element={<DetailsProduct/>}/>
        <Route path='/newdrop/:id' element={<DropDetails/>}/>
    
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
