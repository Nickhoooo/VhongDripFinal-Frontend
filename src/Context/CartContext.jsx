import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, newdrop = null) => {
    setCartItems(prev => {
      const existing = prev.find(
        item => item.id === product.id && item.newdrop?.id === newdrop?.id
      );

      if (existing) {
        return prev.map(item =>
          item.id === product.id && item.newdrop?.id === newdrop?.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, newdrop: newdrop || null, quantity: 1 }];
    });
  };

  const removeFromCart = (id, newdropId = null) => {
    setCartItems(prev =>
      prev.filter(item => {
        const sameProduct = String(item.id) === String(id);
        const sameNewdrop = String(item.newdrop?.id || null) === String(newdropId || null);
        return !(sameProduct && sameNewdrop);
      })
    );
  };

  const updateQuantity = (id, newdropId = null, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id, newdropId);
      return;
    }
    setCartItems(prev =>
      prev.map(item => {
        const sameProduct = String(item.id) === String(id);
        const sameNewdrop = String(item.newdrop?.id || null) === String(newdropId || null);
        return sameProduct && sameNewdrop ? { ...item, quantity: newQuantity } : item;
      })
    );
  };

  // ✅ ADDED — clear lahat ng items sa cart
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    // ✅ ADDED — clearCart sa Provider value
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};