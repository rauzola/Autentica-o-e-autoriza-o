import { createContext, ReactNode } from "react";
import { api } from "../services/api";

type SingnInCredentials = {
  email: string;
  password: string;
}

type AuthContextData = {
  singnIn(credentials: SingnInCredentials): Promise<void>;
  isAuthenticated: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const isAuthenticated = false;

  async function singnIn({ email, password }: SingnInCredentials) {
   try {
    const response = await api.post('sessions', {
      email,
      password,
    })
    
    console.log(response.data);
   } catch (err) {
     console.log(err);
   }
  }

  return (
    <AuthContext.Provider value={{ singnIn, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}