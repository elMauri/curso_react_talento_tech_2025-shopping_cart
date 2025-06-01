import { useEffect, useState } from 'react';
import { fetchProducts } from '../api';
import ProductCard from './ProductCard';
import './ProductList.css'; // Importo el archivo de estilos para ProductList

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

/* 
Utilizo useEffect y la funcion fetchProducts para traer la lista de productos cuando se carga el componente
ProductList
*/
  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  if (isLoading) return <p>Cargando productos...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="product-list">
      {products.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}