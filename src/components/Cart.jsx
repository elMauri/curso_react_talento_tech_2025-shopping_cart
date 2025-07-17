
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import './CartSidebar.css';

export default function Cart() {
  const { cart, removeFromCart, increaseQty, decreaseQty } = useCart();
  const [open, setOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showFab, setShowFab] = useState(true);

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // Maneja la animación: oculta el FAB hasta que el sidebar termine de cerrarse
  const handleOpen = () => {
    setShowFab(false);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setTimeout(() => setShowFab(true), 300); // 300ms igual que el transition del sidebar
  };

  return (
    <>
      {showFab && (
        <div
          className={`cart-fab${open ? ' cart-fab--behind' : ''}`}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <button
            className="cart-fab-btn"
            onClick={handleOpen}
            aria-label="Abrir Carrito"
          >
            🛒
            <span className="cart-fab-badge">{cart.length}</span>
          </button>
          {showTooltip && !open && (
            <div className="cart-fab-tooltip">
              Abrir Carrito
            </div>
          )}
        </div>
      )}
      <div className={`cart-backdrop${open ? ' open' : ''}`} onClick={handleClose} />
      <aside className={`cart-sidebar${open ? ' open' : ''}`}>
        <button className="close-btn" onClick={handleClose}>&times;</button>
        <h2>Carrito</h2>
        {cart.length === 0 ? (
          <p>El carrito está vacío.</p>
        ) : (
          cart.map(item => (
            <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <span style={{ flex: 1 }}>{item.title}</span>
              <button
                style={{
                  background: '#eee', border: 'none', borderRadius: 4, width: 28, height: 28, fontSize: 18, cursor: 'pointer',
                }}
                onClick={() => decreaseQty(item.id)}
                aria-label="Restar"
              >-</button>
              <span style={{ minWidth: 24, textAlign: 'center' }}>{item.qty}</span>
              <button
                style={{
                  background: '#eee', border: 'none', borderRadius: 4, width: 28, height: 28, fontSize: 18, cursor: 'pointer',
                }}
                onClick={() => increaseQty(item.id)}
                aria-label="Sumar"
              >+</button>
              <button
                style={{
                  background: 'none', border: 'none', color: '#e74c3c', fontSize: 22, marginLeft: 6, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
                onClick={() => removeFromCart(item.id)}
                aria-label="Eliminar"
                title="Eliminar"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 7h12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3m2 0v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7h12z" /></svg>
              </button>
            </div>
          ))
        )}
        <h3>Total: ${total.toFixed(2)}</h3>
      </aside>
    </>
  );
}