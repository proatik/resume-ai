"use client";

import toast from "react-hot-toast";
import { createContext, useContext, useState, useEffect } from "react";

import api from "@/lib/aixos";

type User = {
  id: number;
  name: string;
  email: string;
};

type AuthContext = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  logout: () => void;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  register: (details: {
    name: string;
    email: string;
    password: string;
  }) => Promise<void>;
};

const AuthContext = createContext<AuthContext | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setIsLoading(true);

    try {
      const response = await api.post("/auth/login", { email, password });
      const { user: userData, message } = response.data;

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      toast.success(message);
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const register = async ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => {
    setIsLoading(true);

    try {
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      const { user: userData, message } = response.data;

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      toast.success(message);
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.post(`/auth/logout/${user?.id}`);

      setUser(null);
      localStorage.removeItem("user");
      toast.success("Logout successful");
    } catch (error) {}
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem("user");
        toast.error("Error parsing saved user");
      }
    }
  }, []);

  const value = {
    user,
    login,
    register,
    logout,
    isLoading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
