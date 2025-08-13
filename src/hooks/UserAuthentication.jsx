import React, { createContext, useState, useEffect, useContext } from "react";
import api, { setBasicAuth } from "../api/client";
import publicApi from "../api/public";

const AuthContext = createContext();

const normalizeUser = (u) => {
  if (!u || typeof u !== "object") return u;

  const raw = u.roles;
  const arr = Array.isArray(raw) ? raw : raw ? [raw] : [];
  const roles = arr.map((r) => {
    if (!r) return r;
    const up = String(r).toUpperCase();
    return up.startsWith("ROLE_") ? up : `ROLE_${up}`;
  });

  // passengerId → always present key (null if missing)
  const passengerId = Object.prototype.hasOwnProperty.call(u, "passengerId")
    ? u.passengerId
    : null;

  return { ...u, roles, passengerId };
};

export function AuthProvider({ children }) {
  const [creds, setCreds] = useState(() => {
    const saved = localStorage.getItem("creds");
    return saved ? JSON.parse(saved) : null;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? normalizeUser(JSON.parse(saved)) : null;
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
    const normalized = normalizeUser(data);

    setCreds({ username, password });
    setCurrentUser(normalized);
    localStorage.setItem("creds", JSON.stringify({ username, password }));
    localStorage.setItem("user", JSON.stringify(normalized));
    return normalized;
  };

  const logout = () => {
    setCreds(null);
    setCurrentUser(null);
    localStorage.removeItem("creds");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        register,
        login,
        logout,
        isLoggedIn: !!currentUser,
        isAdmin: currentUser?.roles?.includes("ROLE_ADMIN") || false,
        isUser: currentUser?.roles?.includes("ROLE_USER") || false,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
