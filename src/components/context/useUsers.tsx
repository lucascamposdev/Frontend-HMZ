import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { User } from "@/types/User";
import { apiUrl } from "@/utils/api";

interface UserContextProps {
  users: User[];
  fetchUsers: (page: number, perPage: number) => Promise<User[] | null>;
  fetchUserById: (id: number) => Promise<User | null>;
  updateUserById: (id: number, data: Partial<User>) => Promise<User | null>;
  deleteUserById: (id: number) => Promise<boolean>;
  isLoading: boolean;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading ] = useState<boolean>(false);
  
    const fetchUsers = async (page: number, perPage: number): Promise<User[] | null>  => {
      try {
        const response = await axios.get(apiUrl + "/users", {
          params: { page, per_page: perPage },
        });
        setUsers(response.data.data); 
        return response.data.data
      } catch (error) {
        return null;
      }
    };
  
    const fetchUserById = async (id: number): Promise<User | null> => {
      try {
        const response = await axios.get(`${apiUrl}/users/${id}`);
        return response.data.data;
      } catch (error) {
        return null;
      }
    };
  
    const updateUserById = async (
      id: number,
      data: Partial<User>
    ): Promise<User | null> => {
      setIsLoading(true);
      try {
        const response = await axios.put(`${apiUrl}/users/${id}`, data);
        const updatedUser = response.data;
        
        setUsers((prevUsers) =>
          prevUsers.map((user) => (user.id === id ? { ...user, ...updatedUser } : user))
        );

        setIsLoading(false);
        return response.data;
      } catch (error) {
        setIsLoading(false);
        return null;
      }
    };
  
    const deleteUserById = async (id: number): Promise<boolean> => {
      setIsLoading(true);
      try {
        await axios.delete(`${apiUrl}/users/${id}`);
  
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  
        setIsLoading(false);
        return true;
      } catch (error) {
        setIsLoading(false);
        return false;
      }
    };
  
    return (
      <UserContext.Provider
        value={{ users, fetchUsers, fetchUserById, updateUserById, deleteUserById, isLoading }}
      >
        {children}
      </UserContext.Provider>
    );
  };

export const useUsers = () => {
const context = useContext(UserContext);
if (!context) {
    throw new Error("useUsers deve ser usado dentro de um UserProvider");
}
return context;
};