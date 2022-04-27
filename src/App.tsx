import { BrowserRouter } from "react-router-dom"
import AppRoutes from "./routes";
import { GlobalStyle } from "./shared/style/globalStyle";
import GlobalProvider from "./shared/context/GlobalContext";

export default function App() {
  return (
      <BrowserRouter>
        <GlobalStyle/>
        <GlobalProvider>
          <AppRoutes/>
        </GlobalProvider>
      </BrowserRouter>
  );
}