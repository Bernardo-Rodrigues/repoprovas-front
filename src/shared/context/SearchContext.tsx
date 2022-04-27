import { createContext, useState } from "react";
import React from "react"

interface Props {
    children: React.ReactNode
}

export interface SearchContextType {
    search: string
    setSearch: React.Dispatch<React.SetStateAction<string>>
}

export const SearchContext = createContext<SearchContextType | null>(null);

export default function SearchProvider({ children }: Props ) {
  const [search, setSearch] = useState('');

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  )
}