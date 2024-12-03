import "./App.css";
import { AppRoutes } from "./rotas/rotas.jsx";
import { ThemeProvider } from "./context/theme-context.jsx";

const App = () => {
  return (
    <>
      <ThemeProvider>
        <AppRoutes />
      </ThemeProvider>
    </>
  );
};

export default App;
