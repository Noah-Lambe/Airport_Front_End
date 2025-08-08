import React, { createContext, useState, useEffect, useContext } from "react";
import api, { setBasicAuth } from "../api/client";
import publicApi from "../api/public";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [creds, setCreds] = useState(() => {
    const saved = localStorage.getItem("creds");
    return saved ? JSON.parse(saved) : null;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (creds) {
      setBasicAuth(creds.username, creds.password);
    } else {
      api.defaults.auth = undefined;
    }
  }, [creds]);

  const register = async (req) => {
    await publicApi.post("/auth/register", { ...req, role: "ROLE_USER" });
    return login(req.username, req.password);
  };

  const login = async (username, password) => {
    setBasicAuth(username, password);
    const { data } = await api.post("/auth/login", { username, password });
    setCreds({ username, password });
    setCurrentUser(data);
    localStorage.setItem("creds", JSON.stringify({ username, password }));
    localStorage.setItem("user", JSON.stringify(data));
    return data;
  };

  const logout = () => {
    setCreds(null);
    setCurrentUser(null);
    localStorage.removeItem("creds");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ currentUser, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
