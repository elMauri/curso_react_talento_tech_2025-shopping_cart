import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const { isAuth, name, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <header>
      <div className="header-title">
        <div>
          <h1>Polimarket store</h1>
        </div>
        <div className="header-logo">
          <img
            src="../../public/logo_store.png"
            alt="Logo"
          />
        </div>
      </div>
      {isAuth ? (
        <div className="header-links">
          <span className="header-link">Hola, {name}</span>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
      ) : null}
    </header>
  );
};

export default Header;
