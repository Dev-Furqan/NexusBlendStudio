import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#05060A",
        surface: {
          DEFAULT: "rgb(14 16 22 / <alpha-value>)",
          elevated: "#15171F",
        },
        border: "rgb(255 255 255 / 0.08)",
        text: {
          primary: "#F4F5F7",
          muted: "#7C818F",
        },
        accent: {
          violet: "#7C3AED",
          cyan: "#06E5C6",
          magenta: "#FF3D81",
        },
      },
      backgroundImage: {
        "accent-gradient": "linear-gradient(135deg, #7C3AED 0%, #06E5C6 100%)",
        "accent-gradient-secondary":
          "linear-gradient(135deg, #FF3D81 0%, #7C3AED 100%)",
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      boxShadow: {
        glass: "0 24px 80px rgb(0 0 0 / 0.28)",
      },
    },
  },
  plugins: [],
};
export default config;
