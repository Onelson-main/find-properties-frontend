import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "ACCENT": "#007BFF",
        "SECONDARY": "#804004",
        "BACKGROUND": "#FFFFFF",
        "BACKGROUND_2": "#F5F5F5",
        "FOREGROUND": "#333333",
        "POSITIVE": "#4CAF50",
        "NEGATIVE": "#F44336"
      },
    },
  },
  plugins: [],
} satisfies Config;
