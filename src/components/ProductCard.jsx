import { useRef, useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useProducts } from "../context/ProductContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ProductCard.css";


export default function ProductCard({ product }) {
  const { cart, addToCart, increaseQty, decreaseQty } = useCart();
  const { isAuth, isAdmin } = useAuth();
  const { removeProduct } = useProducts();
  const ref = useRef();
  const [visible, setVisible] = useState(false);
  const itemInCart = cart.find((p) => p.id === product.id);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Handler para eliminar producto con confirmación Toastify
  const handleDeleteProduct = () => {
    toast.info(
      <div>
        ¿Seguro que deseas eliminar <b>{product.title}</b>?<br/>
        <button style={{marginTop:8, background:'#e74c3c', color:'#fff', border:'none', borderRadius:4, padding:'4px 12px', cursor:'pointer'}} onClick={() => {
          removeProduct(product.id);
          toast.dismiss();
          toast.success('Producto eliminado');
        }}>Eliminar</button>
        <button style={{marginLeft:8, background:'#eee', color:'#333', border:'none', borderRadius:4, padding:'4px 12px', cursor:'pointer'}} onClick={() => toast.dismiss()}>Cancelar</button>
      </div>,
      { autoClose: false, closeOnClick: false, position: "top-center" }
    );
  };

  return (
    <div
      ref={ref}
      className={`product-card${visible ? " visible" : ""}`}
    >
      <img src={product.image} alt={product.title} className="product-image" />
      <h3>{product.title}</h3>
      <p>${product.price}</p>
      <div className="product-card-actions">
        {itemInCart ? (
          <div className="product-qty-controls">
            <button
              className="product-qty-btn"
              onClick={() => decreaseQty(product.id)}
              aria-label="Restar"
            >-</button>
            <span className="product-qty-value">{itemInCart.qty}</span>
            <button
              className="product-qty-btn"
              onClick={() => increaseQty(product.id)}
              aria-label="Sumar"
            >+</button>
          </div>
        ) : (
          <button className="product-qty-btn" onClick={() => addToCart(product)}>Agregar</button>
        )}
        <div className="product-card-actions-links">
          <Link to={`/product/${product.id}`} style={{ textAlign: 'center' }}>Ver más</Link>
          {isAuth && isAdmin && (
            <>
              <Link to={`/edit/${product.id}`} title="Editar" className="edit-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.414 2.586a2 2 0 0 0-2.828 0l-9.5 9.5A2 2 0 0 0 4 13.5V16a1 1 0 0 0 1 1h2.5a2 2 0 0 0 1.414-.586l9.5-9.5a2 2 0 0 0 0-2.828l-2.5-2.5zM6.5 15H5v-1.5l9.5-9.5 1.5 1.5-9.5 9.5z"/>
                </svg>
              </Link>
              <button title="Eliminar" className="edit-btn" style={{marginLeft:4}} onClick={handleDeleteProduct}>
                <i className="fa-solid fa-trash-can" style={{fontSize:20, color:'#e74c3c'}}></i>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}