
 
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react"

export default function useContexts() {
  return {
    auth: useContext(AuthContext)
  };
} 