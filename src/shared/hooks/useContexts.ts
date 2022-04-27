import { AuthContext, AuthContextType } from "../context/AuthContext";
import { SearchContext, SearchContextType } from "../context/SearchContext";
import { useContext } from "react"

export default function useContexts() {
  return {
    auth: useContext(AuthContext) as AuthContextType,
    search: useContext(SearchContext) as SearchContextType
  };
} 