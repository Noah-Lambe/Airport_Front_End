import React, { createContext, useState, useEffect, useContext } from "react";
import api, { setBasicAuth } from "../api/client";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // store username+password so we can restore Basic Auth after reload
  const [creds, setCreds] = useState(() => {
    const saved = localStorage.getItem("creds");
    return saved ? JSON.parse(saved) : null;
  });

  // initialize currentUser from localStorage (full user object including passengerId)
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  // whenever creds change, apply them to Axios (or clear if null)
  useEffect(() => {
    if (creds) {
      setBasicAuth(creds.username, creds.password);
    } else {
      api.defaults.auth = undefined;
    }
  }, [creds]);

  const register = async (username, password) => {
    // call your register endpoint then login
    await api.post("/auth/register", { username, password, role: "ROLE_USER" });
    return login(username, password);
  };

  const login = async (username, password) => {
    // set Basic Auth headers for this session
    setBasicAuth(username, password);
    const { data } = await api.post("/auth/login", { username, password });
    // data is { username, roles, userId, passengerId, firstName, lastName, phoneNumber, cityId }
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
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
