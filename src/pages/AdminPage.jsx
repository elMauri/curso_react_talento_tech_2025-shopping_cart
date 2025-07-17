import { useState } from "react";
import Modal from "react-modal";
import { useProducts } from "../context/ProductContext";
import "./EditProduct.css";
import "./AdminPage.css";

Modal.setAppElement("#root");
export default function Admin() {
  const { addProduct } = useProducts();
  const [product, setProduct] = useState({
    title: "",
    price: "",
    image: "",
    qty: 1,
    description: ""
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [confirmModalIsOpen, setConfirmModalIsOpen] = useState(false);

  function handleChange(e) {
    const { name, value, files } = e.target;
    if (name === "image" && files.length) {
      setProduct((prev) => ({ ...prev, image: URL.createObjectURL(files[0]), imageFile: files[0] }));
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setConfirmModalIsOpen(true);
  }

  function confirmCreate() {
    addProduct(product);
    setModalIsOpen(true);
    setConfirmModalIsOpen(false);
    setProduct({ title: "", price: "", image: "", qty: 1, description: "" });
  }

  function closeModal() {
    setModalIsOpen(false);
  }

  function closeConfirmModal() {
    setConfirmModalIsOpen(false);
  }

  return (
    <div className="admin-form-container">
      <h2 className="admin-form-title">Crear nuevo producto</h2>
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="edit-input-group">
          <label>
            Nombre:
            <input
              name="title"
              value={product.title}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="edit-input-group">
          <label>
            Precio $:
            <input
              name="price"
              type="number"
              value={product.price}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="edit-input-group">
          <label>
            Cantidad:
            <input
              name="qty"
              type="number"
              value={product.qty}
              onChange={handleChange}
              min={1}
              required
            />
          </label>
        </div>
        <div className="edit-input-group">
          <label>
            Imagen:
            <input
              name="image"
              type="file"
              accept="image/*"
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="edit-input-group">
          <label>
            Descripción:
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              rows={3}
              style={{ width: "100%", resize: "none" }}
              required
            />
          </label>
        </div>
        <div className="edit-input-group-image">
          {product.image && (
            <div>
              <img
                src={product.image}
                alt="Vista previa"
                style={{ width: 100, marginTop: 8 }}
              />
            </div>
          )}
          <button type="submit">Crear producto</button>
        </div>
      </form>
      {/* Modal de confirmación antes de crear */}
      <Modal
        isOpen={confirmModalIsOpen}
        onRequestClose={closeConfirmModal}
        contentLabel="Confirmar creación"
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            padding: "32px",
            borderRadius: "12px",
            textAlign: "center",
          },
        }}
      >
        <h3>¿Confirmar creación de producto?</h3>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 24 }}>
          <button onClick={confirmCreate} style={{ background: "#333", color: "#fff", borderRadius: 6, padding: "8px 20px", border: "none" }}>Confirmar</button>
          <button onClick={closeConfirmModal} style={{ background: "#eee", color: "#333", borderRadius: 6, padding: "8px 20px", border: "none" }}>Cancelar</button>
        </div>
      </Modal>
      {/* Modal de éxito */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Confirmación de creación"
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            padding: "32px",
            borderRadius: "12px",
            textAlign: "center",
          },
        }}
      >
        <h3>¡Producto creado!</h3>
        <button onClick={closeModal} style={{ marginTop: 16 }}>
          Cerrar
        </button>
      </Modal>
    </div>
  );
}
