// tailwind.config.ts
import { defineConfig } from "tailwindcss";

export default defineConfig({
  content: ["./src/**/*.{js,ts,jsx,tsx,html}"], // adjust to your project structure
  theme: {
    extend: {
      colors: {
        // NOW
        "now-pastel": "#fff1d6",
        "now-strong": "#ffb112",

        // NOTES
        "notes-pastel": "#e8f9df",
        "notes-strong": "#71dd37",

        // SNIPPETS
        "snippets-pastel": "#d6f5fc",
        "snippets-strong": "#1ecaee",

        // RESEARCH
        "research-pastel": "#e7e7ff",
        "research-strong": "#696cff",
      },
    },
  },
});
