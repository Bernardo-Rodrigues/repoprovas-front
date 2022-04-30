import AlertContext from "./AlertContext"
import AuthProvider from "./AuthContext"
import SearchProvider from "./SearchContext"

interface Props {
    children: React.ReactNode
}

export default function GlobalProvider({children}: Props){
    return (
        <AuthProvider>
            <SearchProvider>
                <AlertContext>
                    {children}
                </AlertContext>
            </SearchProvider>
        </AuthProvider>
    )
}