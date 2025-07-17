import { useState, useEffect } from "react";
import Modal from "react-modal";
import { useNavigate, useParams } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import "./EditProduct.css";

Modal.setAppElement("#root");
export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const [product, setProduct] = useState({
    title: "",
    price: "",
    image: "",
    qty: 1,
  });
  useEffect(() => {
    const prod = products.find((p) => String(p.id) === String(id));
    if (prod) setProduct(prod);
  }, [id, products]);

  // Modal state
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Simula verificación de admin
  const isAdmin = true; // Reemplaza con tu lógica de autenticación

  if (!isAdmin) {
    return <div>No tienes permisos para editar este producto.</div>;
  }

  function handleChange(e) {
    const { name, value, files } = e.target;
    if (name === "image" && files.length) {
      // Para vista previa local
      setProduct((prev) => ({ ...prev, image: URL.createObjectURL(files[0]) }));
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Aquí iría la lógica para guardar los cambios
    setModalIsOpen(true);
  }

  function closeModal() {
    setModalIsOpen(false);
    navigate(-1);
  }

  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginBottom: 16,
        }}
      >
        <h2 style={{ margin: 0 }}>Editar producto</h2>
        {product.title && (
          <span style={{ fontWeight: 500, fontSize: "1.1rem" }}>
            {product.title}
          </span>
        )}
        {product.image && (
          <img
            src={product.image}
            alt={product.title}
            style={{
              width: 48,
              height: 48,
              objectFit: "cover",
              borderRadius: 8,
            }}
          />
        )}
      </div>
      <form onSubmit={handleSubmit}>
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
          <button type="submit">Guardar cambios</button>
        </div>
      </form>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Confirmación de actualización"
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
        <h3>¡Producto actualizado!</h3>
        <button onClick={closeModal} style={{ marginTop: 16 }}>
          Cerrar
        </button>
      </Modal>
    </div>
  );
}
