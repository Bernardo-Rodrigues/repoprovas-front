import { Routes, Route, Navigate } from "react-router-dom"
import { SignUp } from "../pages/SignUp"

export default function AppRoutes() {
    return(
        <Routes>
            <Route path="/" element={ <SignUp/> } />

            <Route path="*" element={ <Navigate to="/"/> } />
        </Routes>
    )
}