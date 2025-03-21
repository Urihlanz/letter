import { useCallback, useEffect, useState } from "react";

type UseDarkModeTypes = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  lightMode: () => void;
  darkMode: () => void;
};

export const useDarkmode = (): UseDarkModeTypes => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      setIsDarkMode(mediaQuery.matches);

      const handleChange = (): void => setIsDarkMode(mediaQuery.matches);
      mediaQuery.addEventListener("change", handleChange);

      return (): void => mediaQuery.removeEventListener("change", handleChange);
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", isDarkMode);
    }
  }, [isDarkMode]);

  const toggleDarkMode = useCallback(() => setIsDarkMode((isDark) => !isDark), []);
  const lightMode = useCallback(() => setIsDarkMode(false), []);
  const darkMode = useCallback(() => setIsDarkMode(true), []);

  return {
    isDarkMode,
    toggleDarkMode,
    lightMode,
    darkMode,
  };
};
