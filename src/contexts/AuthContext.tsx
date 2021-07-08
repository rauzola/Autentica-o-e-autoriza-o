import { createContext, ReactNode, useState } from "react";
import Router from 'next/router';
import { api } from "../services/api";

type User = {
  email: string;
  permissions: string[];
  roles: string[];
}

type SingnInCredentials = {
  email: string;
  password: string;
}

type AuthContextData = {
  singnIn(credentials: SingnInCredentials): Promise<void>;
  user?: User;
  isAuthenticated: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  
  const [user, setUser] = useState<User>();

  const isAuthenticated = !!user;

  async function singnIn({ email, password }: SingnInCredentials) {
   try {
    const response = await api.post('sessions', {
      email,
      password,
    })
    
    const { token, refreshToken, permissions, roles } = response.data;

    setUser({
      email,
      permissions,
      roles,
    })

    Router.push('/dashboard')
   } catch (err) {
     console.log(err);
   }
  }

  return (
    <AuthContext.Provider value={{ singnIn, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  )
}