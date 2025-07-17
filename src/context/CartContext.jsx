import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);


  const addToCart = (product) => {
    setCart(prev => {
      const item = prev.find(p => p.id === product.id);
      return item
        ? prev.map(p => p.id === product.id ? { ...p, qty: p.qty + 1 } : p)
        : [...prev, { ...product, qty: 1 }];
    });
  };

  const increaseQty = (id) => {
    setCart(prev => prev.map(p => p.id === id ? { ...p, qty: p.qty + 1 } : p));
  };

  const decreaseQty = (id) => {
    setCart(prev => prev.map(p => p.id === id ? { ...p, qty: Math.max(1, p.qty - 1) } : p));
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(p => p.id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, increaseQty, decreaseQty }}>
      {children}
    </CartContext.Provider>
  );
};