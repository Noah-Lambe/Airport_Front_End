import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080",
  headers: { "Content-Type": "application/json" },
});

// Basic Authentication
export function setBasicAuth(username, password) {
  api.defaults.auth = { username, password };
}

export default api;
