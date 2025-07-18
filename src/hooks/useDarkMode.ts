import { useEffect, useState } from "react";

export function useDarkMode(initialValue = true) {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const stored = localStorage.getItem("darkMode");
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () =>
    setDarkMode((prev: boolean) => !prev);

  return { darkMode, toggleDarkMode };
}
