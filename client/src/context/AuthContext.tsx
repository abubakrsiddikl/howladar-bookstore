"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { axiosSecure } from "@/lib/axios";

interface User {
  _id: string;
  email: string;
  name: string;
  role: string;
  phone: string
}

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
  refetchUser: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: true,
  logout: async () => {},
  refetchUser: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const res = await axiosSecure.get("/auth/me");
      console.log("auth context", res.data.user);
      setUser(res.data?.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await axiosSecure.post("/auth/logout");
    setUser(null);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, logout, refetchUser: fetchUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
