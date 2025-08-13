import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { "Content-Type": "application/json" },
});

export function setBasicAuth(username, password) {
  api.defaults.auth = { username, password };
}

export default api;
