import AuthProvider from "./AuthContext"
import SearchProvider from "./SearchContext"

interface Props {
    children: React.ReactNode
}

export default function GlobalProvider({children}: Props){
    return (
        <AuthProvider>
            <SearchProvider>
                {children}
            </SearchProvider>
        </AuthProvider>
    )
}