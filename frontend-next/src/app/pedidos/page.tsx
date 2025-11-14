"use client"; 

import { useEffect, useState } from "react";
import { listarPedidos, crearPedido } from "../lib/api";
import PedidoForm from "../components/pedidoForm";
import PedidoList from "../components/pedidoList";

export default function PedidosPage() {
  const [pedidos, setPedidos] = useState<any[]>([]);

  const cargarPedidos = async () => {
    const data = await listarPedidos();
    setPedidos(data);
  };

  useEffect(() => { cargarPedidos(); }, []);

  const handleCrearPedido = async (clienteId: number, productos: any[]) => {
  try {
    await crearPedido(clienteId, productos);
    cargarPedidos();
  } catch (error) {
    console.error("Error creando pedido", error);
  }
};

  return (
    <div>
      <h1>Gestión de Pedidos</h1>
      <PedidoForm onCrear={handleCrearPedido} />
      <PedidoList pedidos={pedidos} />
    </div>
  );
}