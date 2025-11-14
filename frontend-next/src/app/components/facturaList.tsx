"use client";

type Factura = {
  id: number;
  codigo: string;
  total: number;
  fecha: string;
  proveedor: { id: number; nombre: string };
};

type Props = { facturas: Factura[] };

export default function FacturaList({ facturas }: Props) {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Facturas</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Código</th>
            <th style={styles.th}>Proveedor</th>
            <th style={styles.th}>Total</th>
            <th style={styles.th}>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {facturas.map((f) => (
            <tr key={f.id} style={styles.tr}>
              <td style={styles.td}>{f.id}</td>
              <td style={styles.td}>{f.codigo}</td>
              <td style={styles.td}>{f.proveedor?.nombre}</td>
              <td style={styles.td}>${f.total.toFixed(2)}</td>
              <td style={styles.td}>{new Date(f.fecha).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: "800px",
    margin: "2rem auto",
    padding: "1rem",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
  },
  title: {
    textAlign: "center",
    marginBottom: "1rem",
    color: "#333",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontFamily: "Arial, sans-serif",
  },
  th: {
    textAlign: "left",
    padding: "0.75rem",
    borderBottom: "2px solid #0070f3",
    color: "#000",
    backgroundColor: "#e6f0ff",
  },
  tr: {
    borderBottom: "1px solid #ddd",
  },
  td: {
    padding: "0.75rem",
    color: "#000",
  },
};
