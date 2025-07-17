import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const { cart } = useCart();
  const { isAuth, isAdmin } = useAuth();
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <nav>
      <Link to="/">Inicio</Link>
      <Link to="/about">Acerca</Link>
      <Link to="/login">Login</Link>
      {isAuth && isAdmin && <Link to="/admin">Admin</Link>}
    </nav>
  );
}