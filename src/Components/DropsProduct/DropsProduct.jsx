import "../DropsProduct/DropsProduct.css";
import NewSign from "../../assets/sign.png";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function DropsProduct({ newdrop }){

    const { addToCart } = useContext(CartContext);
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();

    const handleAddToCart = () =>{
        if (user){
            addToCart(newdrop, newdrop);
        } else {
            navigate("/signup");
        }
    }

    return(
        <div>
            <div className="Allproduct-Main">
                <div className="Product-Container">
                <div id="Product-child">
                    <img 
                    src={`https://vhongsdrip.great-site.net/images/${newdrop.image}`} 
                    alt={newdrop.name}
                    />
                    <h3>{newdrop.name}</h3>
                    <p>₱{newdrop.price}</p>
                    <div id="Newsign">
                        <img src={NewSign} alt="" />
                    </div>
                </div>
                <div className="Buttons-Container">
                    <Link to={`/newdrop/${newdrop.id}`}>
                        <button id="Buy-Product">BUY NOW</button>
                    </Link>
                    <button onClick={handleAddToCart} id="Add-Product">ADD TO CART</button>
                </div>
                </div>
            </div>
        </div>
    );
}
export default DropsProduct;