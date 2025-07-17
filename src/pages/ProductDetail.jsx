import { useParams } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import "./ProductDetails.css";

export default function ProductDetail() {
  const { id } = useParams();
  const { products, loading, error } = useProducts();
  const product = products.find(p => String(p.id) === String(id));

  if (loading) return <p>Cargando producto...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!product) return <p>Producto no encontrado.</p>;

  return (
    <div className="product-details-container">
      <h2>Detalle del producto</h2>
      <form className="product-details-form">
        <div>
          <label>Nombre:</label>
          <input value={product.title} readOnly className="product-details-input" />
        </div>
        <div>
          <label>Precio:</label>
          <input value={product.price} type="number" readOnly className="product-details-input" />
        </div>
        <div>
          <label>Cantidad:</label>
          <input value={product.qty || 1} type="number" readOnly className="product-details-input" />
        </div>
        <div>
          <label>Imagen:</label>
          <br />
          <img src={product.image} alt={product.title} className="product-details-image" />
        </div>
        <div>
          <label>Descripción:</label>
          <textarea value={product.description || "Sin descripción"} readOnly className="product-details-textarea" />
        </div>
      </form>
    </div>
  );
}