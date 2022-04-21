import { BrowserRouter } from "react-router-dom"
import AppRoutes from "./routes";
import { GlobalStyle } from "./shared/style/globalStyle";
import AuthProvider from "./shared/context/AuthContext";

export default function App() {
  return (
      <BrowserRouter>
        <GlobalStyle/>
        <AuthProvider>
          <AppRoutes/>
        </AuthProvider>
      </BrowserRouter>
  );
}