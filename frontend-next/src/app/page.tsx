import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Dashboard</h1>
      <p className={styles.subtitle}>Bienvenido al sistema de gestión de pedidos y facturas</p>

      <div className={styles.cardContainer}>
        <Link href="/pedidos" className={styles.card}>
          <h3>Pedidos</h3>
          <p>Gestionar y crear pedidos</p>
        </Link>

        <Link href="/facturas" className={styles.card}>
          <h3>Facturas</h3>
          <p>Gestionar y crear facturas</p>
        </Link>
      </div>
    </div>
  );
}
