import { createContext, ReactNode } from "react";

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
    console.log({email, password})
  }

  return (
    <AuthContext.Provider value={{ singnIn, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}