import { createContext, useContext, useEffect, useState } from "react";
import {
  loginUser,
  registerUser,
  firebaseGoogleAuth,
  getCurrentUser,
} from "../services/authService";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    const response = await loginUser({ email, password });
    const { token, user } = response.data;
    localStorage.setItem("token", token);
    setUser(user);
    return response.data;
  };

  const loginWithFirebase = async (firebaseData) => {
    const response = await firebaseGoogleAuth(firebaseData);
    if (response.data?.token) {
      localStorage.setItem("token", response.data.token);
      setUser(response.data.user);
    }
    return response.data;
  };

  const register = async (formData) => {
    return await registerUser(formData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const loadUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) { setLoading(false); return; }
      const response = await getCurrentUser(token);
      setUser(response.data.user);
    } catch {
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadUser(); }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, loginWithFirebase, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
