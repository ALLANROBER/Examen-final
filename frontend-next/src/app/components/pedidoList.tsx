type Pedido = {
  id: number;
  codigo: string;
  total: number;
  fechaCreacion: string;
  cliente: { id: number; nombre: string };
  nombreProducto: string;
};

type Props = { pedidos: Pedido[] };

export default function PedidoList({ pedidos }: Props) {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Pedidos</h2>
      <table style={styles.table}>
        <thead style={styles.thead}>
          <tr>
            <th>ID</th>
            <th>Código</th>
            <th>Cliente</th>
            <th>Producto</th>
            <th>Total</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((p) => (
            <tr key={p.id} style={styles.tr}>
              <td>{p.id}</td>
              <td>{p.codigo}</td>
              <td>{p.cliente?.nombre}</td>
              <td>{p.nombreProducto}</td>
              <td>{p.total}</td>
              <td>{new Date(p.fechaCreacion).toLocaleString()}</td>
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
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    color: "#000",
  },
  title: {
    textAlign: "center",
    marginBottom: "1rem",
    color: "#000",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "left",
    color: "#000",
  },
  thead: {
    backgroundColor: "#0070f3",
    color: "#fff",
  },
  tr: {
    borderBottom: "1px solid #ddd",
    color: "#000",
  },
  trHover: {
    backgroundColor: "#f1f1f1",
    color: "#000",
  },
  th: {
    padding: "0.75rem",
    fontWeight: "bold",
    color: "#fff",
  },
  td: {
    padding: "0.75rem",
    color: "#000",
  },
};