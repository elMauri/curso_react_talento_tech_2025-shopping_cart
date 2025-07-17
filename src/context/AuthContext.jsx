import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Estado de usuario
  const [user, setUser] = useState({
    isAuth: false,
    isAdmin: false,
    name: ""
  });

  // Lógica de login
  function login(username, password) {
    // Simulación: si el usuario es "admin" y la contraseña "admin", es admin
    if (username === "admin" && password === "admin") {
      setUser({ isAuth: true, isAdmin: true, name: "Admin" });
    } else if (username === "user" && password === "user") {
      setUser({ isAuth: true, isAdmin: false, name: "Usuario" });
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  }

  // Lógica de logout
  function logout() {
    setUser({ isAuth: false, isAdmin: false, name: "" });
  }

  return (
    <AuthContext.Provider value={{ ...user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
