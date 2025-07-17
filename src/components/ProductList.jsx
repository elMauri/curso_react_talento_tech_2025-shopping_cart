import { useEffect, useState } from 'react';
import { fetchProducts } from '../api';
import ProductCard from './ProductCard';
import { ToastContainer } from 'react-toastify';
import './ProductList.css'; // Importo el archivo de estilos para ProductList

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

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

  // Filtrar productos según la búsqueda
  const filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
        <input
          type="text"
          placeholder="Buscar producto..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #bbb', minWidth: 220 }}
        />
      </div>
      <div className="product-list">
        {filteredProducts.length > 0
          ? filteredProducts.map(p => <ProductCard key={p.id} product={p} />)
          : <p style={{ textAlign: 'center', width: '100%' }}>No se encontraron productos.</p>
        }
      </div>
      <ToastContainer />
    </>
  );
}