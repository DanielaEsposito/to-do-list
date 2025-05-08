import { useState, useEffect } from "react";
import { createContext, useContext } from "react";
import { fetchUser } from "../api/api";
const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser()
      .then((data) => {
        setUser(data);
      })
      .catch(() => {
        setUser(null);
      });
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
