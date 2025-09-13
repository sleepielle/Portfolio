import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  actualTheme: "light" | "dark"; // The actual theme being applied (resolves 'system')
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check localStorage first, then default to 'system'
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      if (saved === "light" || saved === "dark" || saved === "system") {
        return saved;
      }
    }
    return "system";
  });

  const [actualTheme, setActualTheme] = useState<"light" | "dark">(() => {
    // Initialize actualTheme based on system preference if theme is 'system'
    if (typeof window !== "undefined") {
      if (theme === "system") {
        return window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
      }
      return theme === "dark" ? "dark" : "light";
    }
    return "light";
  });

  useEffect(() => {
    const updateActualTheme = () => {
      if (theme === "system") {
        const systemPrefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        setActualTheme(systemPrefersDark ? "dark" : "light");
      } else {
        setActualTheme(theme);
      }
    };

    updateActualTheme();

    // Listen for system theme changes when using 'system' mode
    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => updateActualTheme();

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [theme]);

  useEffect(() => {
    // Apply theme to document
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(actualTheme);

    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        "content",
        actualTheme === "dark" ? "#1f2937" : "#ffffff"
      );
    } else {
      const meta = document.createElement("meta");
      meta.name = "theme-color";
      meta.content = actualTheme === "dark" ? "#1f2937" : "#ffffff";
      document.head.appendChild(meta);
    }
  }, [actualTheme]);

  useEffect(() => {
    // Save theme preference to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, actualTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    // Return a fallback context instead of throwing an error
    // This prevents the app from crashing during hydration
    return {
      theme: "system" as Theme,
      setTheme: () => {},
      actualTheme: "light" as "light" | "dark",
    };
  }
  return context;
}
