import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const login = (email, password) =>
  api.post("/admin/login", { email, password });

export const checkAuth = () =>
  api.get("/api/auth-status");