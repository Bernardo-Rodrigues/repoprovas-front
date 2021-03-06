import { Routes, Route, Navigate } from "react-router-dom"
import { Home } from "../pages/Home"
import { SignIn } from "../pages/SignIn"
import { SignUp } from "../pages/SignUp"

export default function AppRoutes() {
    return(
        <Routes>
            <Route path="/sign-up" element={ <SignUp/> } />
            <Route path="/sign-in" element={ <SignIn/> } />
            <Route path="/disciplines" element={ <Home/> } />
            <Route path="/instructors" element={ <Home/> } />
            <Route path="/test" element={ <Home/> } />

            <Route path="*" element={ <Navigate to="/disciplines"/> } />
        </Routes>
    )
}