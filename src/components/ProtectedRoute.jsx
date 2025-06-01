import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const isAuth = false;
  return isAuth ? children : <Navigate to="/" />;
}