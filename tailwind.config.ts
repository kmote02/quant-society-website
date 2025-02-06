import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0a", // Dark background
        foreground: "#ffffff", // White text
        primary: {
          DEFAULT: "#2761d8", // Blue
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#6d28d9", // Purple
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#2a2a2a", // Card background
          foreground: "#b0b0b0", // Muted text
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
