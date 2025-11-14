"use client";


import { useEffect, useState } from "react";
import { listarFacturas, crearFactura } from "../lib/api";
import FacturaForm from "../components/facturaForm";
import FacturaList from "../components/facturaList";

export default function FacturasPage() {
  const [facturas, setFacturas] = useState<any[]>([]);

  const cargarFacturas = async () => {
    const data = await listarFacturas();
    setFacturas(data);
  };

  useEffect(() => { cargarFacturas(); }, []);

  const handleCrearFactura = async (proveedorId: number, total: number) => {
    try {
      await crearFactura(proveedorId, total);
      cargarFacturas();
    } catch (error) {
      console.error("Error creando factura", error);
    }
  };
  return (
    <div>
      <h1>Gestión de Facturas</h1>
      <FacturaForm onCrear={handleCrearFactura} />
      <FacturaList facturas={facturas} />
    </div>
  );
}