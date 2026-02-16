import StarRate from "../../assets/star.png";
import StarNull from "../../assets/starnull.png";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import "../ProductDetails/ProductDetails.css";
import Header from "../Header/Header";
function ProductDetails(){

    const { id } = useParams();
    const [product, setProduct] = useState({});
  

    useEffect(() => {
  fetch(`http://localhost/backend/public/products?id=${id}`)
    .then(res => res.json())
    .then(data => {
      const prod = data.find(item => item.id === id); // find the product by id
      setProduct(prod || {}); // set empty object if not found
    })
    .catch(err => console.log("ERROR: ", err));
}, [id]);




    const { addToCart } = useContext(CartContext);
    const user = JSON.parse(localStorage.getItem("user"));
    const navigate = useNavigate();

    const handleAddToCart = () => {
    if (user) {
        addToCart(product, null); // regular product, no promo
    } else {
        navigate("/signup");
    }
        };

    return(
        <>
        <Header/>
        <div className="MainProduct-Details">
            <div className="MainProduct1">
                <div className="MainProduct1-left">
                    <div className="display-4">
                        <img src={`http://localhost/backend/images/${product.image}`} alt={product.name} />
                        <img src={`http://localhost/backend/images/${product.image}`} alt={product.name} />
                        <img src={`http://localhost/backend/images/${product.image}`} alt={product.name} />
                        <img src={`http://localhost/backend/images/${product.image}`} alt={product.name} />

                     
                    </div>
                    <div className="display-main">

                        <img src={`http://localhost/backend/images/${product.image}`} alt={product.name} />

                    </div>
                </div>
                
                <div className="MainProduct1-right">
                    <p id="product-name">
                        {product.name}
                    </p>
                    <div className="Star-container">
                        <img src={StarRate} alt="" />
                        <img src={StarRate} alt="" />
                        <img src={StarRate} alt="" />
                        <img src={StarRate} alt="" />
                        <img src={StarNull} alt="" />
                        <p>(122)</p>
                    </div>
                    <p id="product-price">Price: ₱
                        {product.price}
                    </p>
                    <p id="product-details">
                        {product.details}
                    </p>
                    <p id="product-category">Category: 
                        {product.category}
                    </p>
                    <p id="product-size">Select Size:</p>
                    <div className="Sizes">
                        <div>S</div>
                        <div>M</div>
                        <div>L</div>
                        <div>XL</div>
                        <div>XXL</div>
                    </div>
                    <button onClick={handleAddToCart}>
                    Add to cart
                </button>
                </div>
            </div>

            <div className="MainProduct2">
                <div className="Description">
                    <div><p>Description</p></div>
                    <div><p>Preview</p></div>
                </div>
                <div className="Description-text">
                    <p>Welcome to Shop – Fashion for Everyone! At Shop, we bring you stylish and affordable clothing for men, women, and kids. From everyday wear to the latest trends, our collection is designed to keep your whole family looking good and feeling comfortable. Whether it’s work, school, play, or special occasions, you’ll find outfits that fit every lifestyle. Shopping with us is easy, fun, and budget-friendly—because we believe fashion should be for everyone. Shop with confidence. Dress with style. Only at Shop.</p>
                </div>
            </div>
        </div>
        
        </>
        
    );
}
export default ProductDetails;