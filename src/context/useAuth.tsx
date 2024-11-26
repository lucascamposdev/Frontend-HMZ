import React, { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";
import { apiUrl } from "@/utils/api";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading ] = useState<boolean>(false);

  const login = async (username: string, password: string): Promise<void> => {
    setIsLoading(true)
    try {
      const response = await axios.post(`${apiUrl}/login`, { username, password });
      const { token } = response.data;

      sessionStorage.setItem("token", token);
      setIsAuthenticated(true);
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      throw error; 
    }
  };

  // Validar token ** API não possui rota de validação
  // useEffect(() => {
  //   const validateToken = async () => {
  //     const token = sessionStorage.getItem('token');
  //     if (!token) {
  //       setIsAuthenticated(false);
  //       return;
  //     }

  //     try {
  //       const response = await axios.post(
  //         apiUrl + "/validate",
  //         {},
  //         {
  //           headers: { Authorization: `Bearer ${token}` },
  //         }
  //       );

  //       if (response.status === 200) {
  //         setIsAuthenticated(true);
  //       }
  //     } catch (error) {
  //       sessionStorage.removeItem('token');
  //       setIsAuthenticated(false);
  //     }
  //   };

  //   // validateToken(); 
  // }, []);


  const logout = () => {
    sessionStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
