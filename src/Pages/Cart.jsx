import "../Pages/CSS/Cart.css";
import { useContext, useState } from "react";
import { CartContext } from "../Context/CartContext";
import { useEffect } from "react";
import Header from "../Components/Header/Header";

function Cart(){
     const [isProcessing, setIsProcessing] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        document.body.style.background = "white"; 
        document.body.style.color = "#000"; 
            
        return () => {
            document.body.style.background = "";
            document.body.style.color = "";
        };
    }, []);

    const { cartItems, removeFromCart } = useContext(CartContext);

    const cartTotal = cartItems.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0);


    const handleCheckout = async (e) => {
        e.preventDefault();
        
        if (cartItems.length === 0) {
            setMessage("Cart is empty!");
            return;
        }

        setIsProcessing(true);
        setMessage("");

        try {
            const response = await fetch("http://localhost/backend/public/checkout", {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    total: cartTotal
                })
            });

            const data = await response.json();
            setMessage(data.message || "Checkout successful!");
        } catch (err) {
            console.error("ERROR:", err);
            setMessage("Error processing checkout. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };


    return(
    <>
    <Header/>
    <div className="Cart-Main">

        <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>

     {cartItems.map(item => (
  <div className="CartItems-container" key={item.id + (item.newdrop?.id || '')}>
    <img
      src={`http://localhost/backend/images/${item.newdrop?.display || item.image}`}
      width="100"
      alt={item.name}
    />
    <p>{item.name}{item.newdrop ? ` - ${item.newdrop.name}` : ''}</p>
    <p>₱{item.price}</p>
    <p>Qty: {item.quantity}</p>
    <p>Total: ₱{item.price * item.quantity}</p>
    <button
    id="Remove-cart"
    onClick={() => removeFromCart(item.id, item.newdrop?.id || null)}
    >
    Remove
    </button>


  </div>
))}


        <div className="Computation-container">
            <div className="Totals-container">
              <form onSubmit={handleCheckout}>
                <h1>Cart Totals</h1>
                  <div className="subtotal">
                      <p>Subtotal</p>
                      <p>₱ {cartTotal}</p>
                  </div>
                  <hr />
                  <div className="shipping-fee">
                      <p>Shipping Fee</p>
                      <p>Free</p>
                  </div>
                  <hr />
                  <div className="Total">
                      <p>Total</p>
                      <p>₱ {cartTotal}</p>
                  </div>
                  <hr />
                  {message && <p style={{color: message.includes("Error") ? "red" : "green"}}>{message}</p>}
                  <button id="checkout-button" type="submit" disabled={isProcessing}>
                      {isProcessing ? "Processing..." : "PROCEED TO CHECKOUT"}
                  </button>
              </form>
                
            </div>
            <div className="Promo-container">
                <input type="text" placeholder="promo code"/>
                <button>Submit</button>
            </div>
            
        </div>


    </div>
    </>
    
  );
}
export default Cart;