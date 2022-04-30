import { BrowserRouter } from "react-router-dom"
import AppRoutes from "./routes";
import { GlobalStyle } from "./shared/style/globalStyle";
import GlobalProvider from "./shared/context/GlobalContext";
import Alert from "./shared/components/Alert";

export default function App() {
  return (
      <BrowserRouter>
        <GlobalStyle/>
        <GlobalProvider>
          <AppRoutes/>
          <Alert/>
        </GlobalProvider>
      </BrowserRouter>
  );
}