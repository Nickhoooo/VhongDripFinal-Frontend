import "../Pages/CSS/Cart.css";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../Context/CartContext";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import QrGcash from "../assets/QrforGcash.png";
function Cart() {
    const [isProcessing, setIsProcessing] = useState(false);
    const [message, setMessage]           = useState("");
    const [proof, setProof]               = useState(null);
    const [showModal, setShowModal]       = useState(false);
    const [user, setUser]                 = useState(null);

    const { cartItems, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);

    useEffect(() => {
        fetch("https://vhongsdrip.great-site.net/profile", { credentials: "include" })
            .then(res => res.json())
            .then(data => setUser(data));
    }, []);

    useEffect(() => {
        document.body.style.background = "white";
        document.body.style.color = "#000";
        return () => {
            document.body.style.background = "";
            document.body.style.color = "";
        };
    }, []);

    const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    function increaseQuantity(id, newdropId = null) {
        const item = cartItems.find(item =>
            String(item.id) === String(id) &&
            String(item.newdrop?.id || null) === String(newdropId || null)
        );
        if (item) updateQuantity(id, newdropId, item.quantity + 1);
    }

    function decreaseQuantity(id, newdropId = null) {
        const item = cartItems.find(item =>
            String(item.id) === String(id) &&
            String(item.newdrop?.id || null) === String(newdropId || null)
        );
        if (item) updateQuantity(id, newdropId, item.quantity - 1);
    }

    const handleCheckout = async (e) => {
        e.preventDefault();

        if (cartItems.length === 0) {
            setMessage("Cart is empty!");
            return;
        }

        // GCash → show modal para mag-upload ng proof
        if (user?.payment_mode === "gcash") {
            setShowModal(true);
            return;
        }

        // Cash on Delivery → normal checkout
        setIsProcessing(true);
        setMessage("");

        try {
            const response = await fetch("https://vhongsdrip.great-site.net/checkout", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams({ total: cartTotal })
            });

            const data = await response.json();

            if (data.success) {
                setMessage(data.message);
                clearCart(); // ✅ Clear cart after successful COD
            } else {
                setMessage(data.message || "Checkout failed.");
            }
        } catch (err) {
            console.error("ERROR:", err);
            setMessage("Error processing checkout. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    const submitProof = async () => {
        if (!proof) {
            alert("Please upload your GCash payment proof.");
            return;
        }

        const formData = new FormData();
        formData.append("payment_proof", proof);
        formData.append("total", cartTotal);

        try {
            const res = await fetch("https://vhongsdrip.great-site.net/checkout", {
                method: "POST",
                credentials: "include",
                body: formData
            });

            const data = await res.json();

            setShowModal(false);
            setMessage(data.message);

            if (data.success) {
                clearCart(); // ✅ Clear cart after GCash submission
            }
        } catch (err) {
            console.error("ERROR:", err);
            setMessage("Error submitting payment. Try again.");
        }
    };

    return (
        <>
            <Header />
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
                            src={`https://vhongsdrip.great-site.net/images/${item.newdrop?.display || item.image}`}
                            width="100"
                            alt={item.name}
                        />
                        <p>{item.name}{item.newdrop ? ` - ${item.newdrop.name}` : ''}</p>
                        <p>₱{item.price}</p>

                        <div className="qty-container">
                            <button id="increaseQuantity" onClick={() => increaseQuantity(item.id, item.newdrop?.id)}>+</button>
                            <p>{item.quantity}</p>
                            <button id="decreaseQuantity" onClick={() => decreaseQuantity(item.id, item.newdrop?.id)}>-</button>
                        </div>

                        <p>Total: ₱{item.price * item.quantity}</p>
                        <button id="Remove-cart" onClick={() => removeFromCart(item.id, item.newdrop?.id || null)}>
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
                                <p>₱{cartTotal}</p>
                            </div>
                            <hr />
                            <div className="shipping-fee">
                                <p>Shipping Fee</p>
                                <p>Free</p>
                            </div>
                            <hr />
                            <div className="Total">
                                <p>Total</p>
                                <p>₱{cartTotal}</p>
                            </div>
                            <hr />

                            {message && (
                                <p style={{ color: message.toLowerCase().includes("error") || message.includes("declined") ? "red" : "green" }}>
                                    {message}
                                </p>
                            )}

                            <button id="checkout-button" type="submit" disabled={isProcessing}>
                                {isProcessing ? "Processing..." : "PROCEED TO CHECKOUT"}
                            </button>
                        </form>
                    </div>

                    <div className="Notice">
                        <p>⚠ No Cancellation</p>
                        <p>⚠ No Refund
                        Orders processed after payment verification</p>
                    </div>
                </div>

                {/* ✅ GCash Modal — outside the form */}
                {showModal && (
                <div className="gcash-modal">
                    <div className="modal-box">
                        <h2>GCash Payment</h2>
                        <p>Name: {user?.firstname} {user?.lastname}</p>
                        <p>Address: {user?.address}</p>
                        <p>Total: <b>₱{cartTotal}</b></p>

                        <img src={QrGcash} width="200" alt="GCash QR" />
                        <p>Send payment to: <b>09949640860</b></p>

                        <p>Upload your payment screenshot:</p>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setProof(e.target.files[0])}
                        />

                    <div className="ButtonsForPayment">
                        <button id="Submit-Payment" onClick={submitProof}>Submit</button>
                        <button id="Cancel-Payment" onClick={() => setShowModal(false)}>Cancel</button>
                    </div>
                    </div>    
                </div>
                )}

            </div>
            <Footer />
        </>
    );
}

export default Cart;