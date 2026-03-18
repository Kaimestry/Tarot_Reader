/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // <--- IMPORTANT: Tells Tailwind to switch when the 'dark' class is present
  theme: {
    extend: {
      // 1. Background Colors (creates bg-main, bg-surface)
      backgroundColor: {
        main: "var(--color-bg-main)",
        surface: "var(--color-bg-surface)",
        primary: "var(--color-bg-primary)",
      },
      // 2. Text Colors (creates text-main, text-muted)
      textColor: {
        main: "var(--color-text-main)",
        muted: "var(--color-text-muted)",
      },
      // 3. General Colors (creates border-divider, bg-primary, text-secondary, etc.)
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        divider: "var(--color-border)",
      },
      borderColor: {
        primary: "var(--border-primary)",
      },

      animation: {
        "spin-slow": "spin 100s linear infinite",
      },
    },
  },
  plugins: [],
};
