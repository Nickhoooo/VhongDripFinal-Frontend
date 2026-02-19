import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import "../AllProduct/AllProduct.css";
import { useContext, useEffect, useState } from "react";


function AllProduct({ product }){

  const { addToCart } = useContext(CartContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (user){
      addToCart(product);
    } else {
      navigate("/signup");
    }
  }

  if (product) {
    return(
      <div className="Allproduct-Main">
        <div className="Product-Container">
          <div id="Product-child">
            <img 
              src={`https://vhongsdrip.great-site.net/images/${product.image}`} 
              alt={product.name}
            />
            <h3>{product.name}</h3>
            <p>₱{product.price}</p>
          </div>
          <div className="Buttons-Container">
            <Link to={`/product/${product.id}`}>
              <button id="Buy-Product">BUY NOW</button>
            </Link>
              
              <button onClick={handleAddToCart} id="Add-Product">ADD TO CART</button>
          </div>
        </div>
      </div>
    );
  }

  // If no product prop, fetch all products
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://vhongsdrip.great-site.net/public/products")
      .then(res => res.json())
      .then(data => {
        setProducts(data);
      })
  }, []);

}
export default AllProduct;