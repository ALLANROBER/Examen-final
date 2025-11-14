"use client";

import { useState } from "react";

type Props = {
  onCrear: (proveedorId: number, total: number) => Promise<void>;
};

export default function FacturaForm({ onCrear }: Props) {
  const [proveedorId, setProveedorId] = useState<number | "">("");
  const [total, setTotal] = useState<number | "">("");
  const [mensaje, setMensaje] = useState<string>("");

  const handleSubmit = async () => {
    if (!proveedorId || total === "") {
      setMensaje("Debe ingresar un ID de proveedor y un total válido");
      return;
    }
    if (Number(total) <= 0) {
      setMensaje("El total debe ser mayor a 0");
      return;
    }

    try {
      await onCrear(Number(proveedorId), Number(total));
      setMensaje("Factura creada exitosamente!");
      setProveedorId("");
      setTotal("");
    } catch (error) {
      setMensaje("Error al crear factura");
      console.error(error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Crear Factura</h2>

      {mensaje && (
        <p style={{ ...styles.mensaje, color: mensaje.includes("exitosamente") ? "green" : "red" }}>
          {mensaje}
        </p>
      )}

      <div style={styles.form}>
        <input
          type="number"
          placeholder="Proveedor ID"
          value={proveedorId}
          onChange={(e) => setProveedorId(e.target.value === "" ? "" : Number(e.target.value))}
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Total"
          value={total}
          onChange={(e) => setTotal(e.target.value === "" ? "" : Number(e.target.value))}
          style={styles.input}
        />
        <button onClick={handleSubmit} style={styles.button}>
          Crear Factura
        </button>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: "400px",
    margin: "2rem auto",
    padding: "2rem",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
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
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  input: {
    padding: "0.75rem",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  button: {
    padding: "0.75rem",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#0070f3",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
};

