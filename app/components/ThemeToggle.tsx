import { useTheme } from "../contexts/ThemeContext";
import { FaSun, FaMoon, FaDesktop } from "react-icons/fa";
import { useState } from "react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themes = [
    { value: "light" as const, label: "Light", icon: FaSun },
    { value: "dark" as const, label: "Dark", icon: FaMoon },
    { value: "system" as const, label: "System", icon: FaDesktop },
  ];

  const currentTheme = themes.find((t) => t.value === theme) || themes[0];
  const CurrentIcon = currentTheme.icon;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-500 text-white hover:text-white transition-colors"
        title="Toggle theme"
        aria-label="Toggle theme"
      >
        <CurrentIcon className="text-sm" />
        <span className="hidden sm:inline text-sm">{currentTheme.label}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 w-32 bg-white/70 border border-blue-500 rounded-lg shadow-lg z-20">
            {themes.map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                onClick={() => {
                  setTheme(value);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-gray-700 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                  theme === value
                    ? "text-blue-400 bg-gray-700"
                    : "text-gray-300"
                }`}
              >
                <Icon className="text-sm" />
                {label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ThemeToggle;
