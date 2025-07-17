import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Recibe isAdminRequired como prop
export default function ProtectedRoute({ children, isAdminRequired = false }) {
  // Usa el contexto de autenticación correctamente
  const { isAuth, isAdmin } = useAuth();
  const location = useLocation();

  // Si no está autenticado, redirige a login y guarda la ruta original
  if (!isAuth) {
    setTimeout(() => {}, 100); // Para mostrar el mensaje antes de redirigir
    return <>
      <div style={{textAlign: 'center', marginTop: '40px', fontSize: '1.2rem'}}>Redirigiendo a login...</div>
      <Navigate to="/login" replace state={{ from: location }} />
    </>;
  }
  // Si no es admin y la ruta lo requiere, redirige a home
  if (isAdminRequired && !isAdmin) {
    return <Navigate to="/" replace />;
  }
  return children;
}