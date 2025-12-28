"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

interface AuthContextType {
  isLoggedIn: boolean;
  username: string | null;
  userId: string | null;
  email: string | null;
  role: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  username: null,
  userId: null,
  email: null,
  role: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  const fetchUser = async (token: string) => {
    try {
      const res = await axios.get(
        "http://localhost:4000/api/v1/getuserinformation",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const user = res.data.data;

      setUsername(user.username);
      setUserId(user._id);
      setEmail(user.email);
      setRole(user.role);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Auth fetch error:", error);
      logout();
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) fetchUser(token);
  }, []);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    fetchUser(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUsername(null);
    setUserId(null);
    setEmail(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, username, userId, email, role, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
