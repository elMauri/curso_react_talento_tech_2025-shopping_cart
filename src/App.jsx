import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import './App.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import About from './pages/About';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Header from './components/Header';
import Cart from './components/Cart';
import EditProduct from './pages/EditProduct';
import { ProductProvider } from './context/ProductContext';
import Admin from './pages/AdminPage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <ProductProvider>
            <Header />
            <Navbar />
            <div className="content-wrapper">
              <Routes>
                <Route path="/" element={<><Home /><Cart /></>} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<div className="center-content"><Login /></div>} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/admin" element={
                  <ProtectedRoute>
                    <Admin />
                  </ProtectedRoute>}
                />
                <Route path="/edit/:id" element={
                  <ProtectedRoute isAdminRequired={true}>
                    <EditProduct />
                  </ProtectedRoute>
                } />
              </Routes>
              <Footer />
            </div>
          </ProductProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App;