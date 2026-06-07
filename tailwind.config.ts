import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#1b2a4e",
          deep: "#16223f",
        },
        cream: "#f5f3ec",
        brand: {
          DEFAULT: "#3b5bdb",
          soft: "#e7ecfb",
          ink: "#2c3e8c",
        },
        correct: {
          DEFAULT: "#1f9d5b",
          soft: "#e4f6ec",
        },
        wrong: {
          DEFAULT: "#d6455d",
          soft: "#fbe7eb",
        },
      },
      fontFamily: {
        sans: [
          "Pretendard",
          "-apple-system",
          "BlinkMacSystemFont",
          "system-ui",
          "Roboto",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 1px 2px rgba(16, 24, 40, 0.04), 0 1px 3px rgba(16, 24, 40, 0.06)",
        pop: "0 10px 30px rgba(16, 24, 40, 0.12)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.25s ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
