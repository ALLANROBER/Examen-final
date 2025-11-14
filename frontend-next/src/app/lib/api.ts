import axios from "axios";

const BASE_PEDIDOS = "http://localhost:8081/api/pedidos"; // ajustar el puerto del componente A
const BASE_FACTURAS = "http://localhost:8082/api/facturas"; // ajustar el puerto del componente B

export const listarPedidos = async () => {
  const res = await axios.get(BASE_PEDIDOS);
  return res.data;
};

export const crearPedido = async (clienteId: number, productos: {nombre: string, cantidad: number, precio: number}[]) => {
  const res = await axios.post(`${BASE_PEDIDOS}?clienteId=${clienteId}`, productos);
  return res.data;
};

export const listarPedidosPorCliente = async (clienteId: number) => {
  const res = await axios.get(`${BASE_PEDIDOS}/cliente/${clienteId}`);
  return res.data;
};

export const listarFacturas = async () => {
  const res = await axios.get(BASE_FACTURAS);
  return res.data;
};

export const crearFactura = async (proveedorId: number, total: number) => {
  const res = await axios.post(`${BASE_FACTURAS}?proveedorId=${proveedorId}&total=${total}`);
  return res.data;
};
