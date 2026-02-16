import "../Header/Header.css";
import { Link } from "react-router-dom";
import CartIcon from "../../assets/shopping-cart (1).png";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import { useState } from "react";
import { useEffect } from "react";

function Header(){

  const [open, setOpen] = useState(false);
  const { cartItems } = useContext(CartContext);
  const [user, setUser] = useState(null);

  const CartCount = cartItems.reduce(
    (total, item) => total + item.quantity, 0
  )
  
 useEffect(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    setUser(JSON.parse(storedUser));
  }
}, []);

  

   const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null); 
    window.location.href = "/login";
  };


  return(
    <div className="Header-Main">
      <div className="Logoname-Container">
       <h1>VHONG DRIP - STORE</h1>
        {user && <span> HELLO! {user.username}</span>}
      </div>
      
      <nav>
        <Link to={"/"}>HOME</Link>
        <Link to={"/home"}>PRODUCT</Link>  {/*Home product ito*/}
        <Link to={"/drops"}>NEW DROP</Link>
      </nav>
      <div className="Header-Buttons">
        {user ? (
        <button onClick={handleLogout} id="LogOut-Button">
          Logout
        </button>
      ) : (
        <div className="auth-wrapper">
          <div className="auth-buttons">
            <Link to="/login">
              <button id="Login-Header">Log-In</button>
            </Link>
            <Link to="/signup">
              <button id="SignUp-Header">Sign-Up</button>
            </Link>
          </div>
        </div>
      )}
          <Link to={"/cart"}>
            <img src={CartIcon} alt="" />
          </Link>
          <div className="CartCount">{CartCount}</div>
      </div>
    </div>
  );
}
export default Header;