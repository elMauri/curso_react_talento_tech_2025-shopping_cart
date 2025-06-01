import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Navbar.css";

export default function Navbar() {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <nav>
      <Link to="/">Inicio</Link>
      <Link to="/about">Acerca</Link>
      <Link to="/login">Login</Link>
      <Link to="/admin">Admin</Link>
      <div style={{ marginLeft: "auto", position: "relative" }}>
        <Link to="/cart" style={{ fontSize: 24 }}>
          🛒
        </Link>
        <div style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          top: 32,
          fontSize: 14,
          color: "#fff",
          background: "#e74c3c",
          borderRadius: "12px",
          padding: "2px 8px",
          minWidth: 20,
          textAlign: "center"
        }}>
          {totalItems}
        </div>
      </div>
    </nav>
  );
}