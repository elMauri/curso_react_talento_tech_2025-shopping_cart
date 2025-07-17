import { createContext, useContext, useState, useEffect } from "react";
import { fetchProducts } from "../api";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  // Elimina producto por id
  const removeProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  // Agrega producto nuevo
  const addProduct = (newProduct) => {
    setProducts(prev => [
      { ...newProduct, id: Date.now() },
      ...prev
    ]);
  };

  return (
    <ProductContext.Provider value={{ products, loading, error, removeProduct, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductContext);
}
