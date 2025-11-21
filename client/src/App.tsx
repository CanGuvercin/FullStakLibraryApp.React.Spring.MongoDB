import { useEffect } from "react";
import { useThemeStore } from "./store/themeStore";
import Layout from "./components/Layout";

function App() {
  const theme = useThemeStore((s) => s.theme);

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, [theme]);

  return <Layout />;
}

export default App;
