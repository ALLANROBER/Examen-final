"use client";

import { useState } from "react";

type Producto = { nombre: string; cantidad: number; precio: number };

type Props = {
  onCrear: (clienteId: number, productos: Producto[]) => Promise<void>;
};

export default function PedidoForm({ onCrear }: Props) {
  const [clienteId, setClienteId] = useState<number | "">("");
  const [productos, setProductos] = useState<Producto[]>([{ nombre: "", cantidad: 1, precio: 0 }]);
  const [mensaje, setMensaje] = useState<string>("");

  const handleProductoChange = (index: number, field: string, value: string) => {
    const newProductos = [...productos];
    if (field === "nombre") newProductos[index].nombre = value;
    if (field === "cantidad") newProductos[index].cantidad = parseInt(value) || 0;
    if (field === "precio") newProductos[index].precio = parseFloat(value) || 0;
    setProductos(newProductos);
  };

  const agregarProducto = () => setProductos([...productos, { nombre: "", cantidad: 1, precio: 0 }]);
  const eliminarProducto = (index: number) => setProductos(productos.filter((_, i) => i !== index));

  const handleSubmit = async () => {
    if (!clienteId) { setMensaje("Debe ingresar un ID de cliente"); return; }
    if (productos.some(p => !p.nombre || p.cantidad <= 0 || p.precio <= 0)) {
      setMensaje("Todos los productos deben tener nombre, cantidad y precio válidos");
      return;
    }

    try {
      await onCrear(Number(clienteId), productos);
      setMensaje("Pedido creado exitosamente!");
      setClienteId("");
      setProductos([{ nombre: "", cantidad: 1, precio: 0 }]);
    } catch (error) {
      setMensaje("Error al crear pedido");
      console.error(error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Crear Pedido</h2>

      {mensaje && (
        <p style={{ ...styles.mensaje, color: mensaje.includes("exitosamente") ? "green" : "red" }}>
          {mensaje}
        </p>
      )}

      <input
        type="number"
        placeholder="Cliente ID"
        value={clienteId}
        onChange={(e) => setClienteId(e.target.value === "" ? "" : Number(e.target.value))}
        style={styles.input}
      />

      {productos.map((p, i) => (
        <div key={i} style={styles.productoContainer}>
          <input
            placeholder="Nombre del Producto"
            value={p.nombre}
            onChange={(e) => handleProductoChange(i, "nombre", e.target.value)}
            style={styles.input}
          />
          <input
            type="number"
            placeholder="Cantidad"
            value={p.cantidad}
            onChange={(e) => handleProductoChange(i, "cantidad", e.target.value)}
            style={styles.inputSmall}
          />
          <input
            type="number"
            placeholder="Precio"
            value={p.precio}
            onChange={(e) => handleProductoChange(i, "precio", e.target.value)}
            style={styles.inputSmall}
          />
          <button onClick={() => eliminarProducto(i)} style={styles.buttonDelete}>
            Eliminar
          </button>
        </div>
      ))}

      <div style={styles.botonesContainer}>
        <button onClick={agregarProducto} style={styles.buttonAdd}>Agregar Producto</button>
        <button onClick={handleSubmit} style={styles.buttonSubmit}>Crear Pedido</button>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: "600px",
    margin: "2rem auto",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    backgroundColor: "#f9f9f9",
  },
  title: {
    textAlign: "center",
    marginBottom: "1rem",
    color: "#333",
  },
  mensaje: {
    textAlign: "center",
    marginBottom: "1rem",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "0.75rem",
    marginBottom: "1rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  inputSmall: {
    width: "100px",
    padding: "0.5rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "0.9rem",
  },
  productoContainer: {
    display: "flex",
    gap: "0.5rem",
    alignItems: "center",
    marginBottom: "1rem",
    flexWrap: "wrap",
  },
  buttonDelete: {
    padding: "0.5rem 1rem",
    backgroundColor: "#ff4d4f",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  botonesContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "1rem",
    flexWrap: "wrap",
    gap: "0.5rem",
  },
  buttonAdd: {
    padding: "0.75rem 1.5rem",
    backgroundColor: "#0070f3",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  buttonSubmit: {
    padding: "0.75rem 1.5rem",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};