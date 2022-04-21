import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import React from "react"

export const AuthContext = createContext({auth:{}, login:(authData: any)=>{}, logout:()=>{}});

interface Props {
    children: React.ReactNode
  }

export default function AuthProvider({ children }: Props ) {
  const [auth, setAuth] = useLocalStorage('auth', null);

  function login(authData: any) {
    setAuth(authData);
  }

  function logout() {
    setAuth(null);
  }

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}