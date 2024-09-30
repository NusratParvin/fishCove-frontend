import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
  darkMode: "class",
  // plugins: [nextui()],
  plugins: [
    nextui({
      themes: {
        aqua: {
          extend: "light",
          colors: {
            customBlue: "#33B7FF",
            customOrange: "#FF7F50",
            background: "#6DD6E8", // Light Aqua
            foreground: "#ffffff",
            // primary: "#008C8C", // Deep Teal
            primary: "#00b8ce", // Deep Teal
            secondary: "#F4E3D7", // Soft Sand
            highlight: "#FF6B61", // Coral Orange
            text: "#000000", // Black for text
            "text-default": "#000000", // Default text color
            "text-hover": "#FF6B61", // Default hover color (Coral Orange)
            focus: "#FF6B61", // Use highlight color for focus
          },
        },
      },
    }),
  ],
};
