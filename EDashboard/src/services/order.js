import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const getOrders = () => api.get("/order");
export const updateOrderStatus = (id, status) =>
  api.put(`/order/${id}`, { status });