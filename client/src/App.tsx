import { useEffect } from "react";
import { useThemeStore } from "./store/themeStore";
import AppRouter from "./routing/AppRouter";

function App() {
  const theme = useThemeStore((s) => s.theme);

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, [theme]);

  return <AppRouter />;
}

export default App;
