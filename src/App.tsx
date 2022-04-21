import { BrowserRouter } from "react-router-dom"
import AppRoutes from "./routes";
import { GlobalStyle } from "./shared/style/globalStyle";

export default function App() {
  return (
      <BrowserRouter>
        <GlobalStyle/>
        <AppRoutes/>
      </BrowserRouter>
  );
}