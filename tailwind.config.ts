import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        abyss: "#04160F",
        deep: "#062B20",
        deeper: "#051F17",
        panel: "#0A3626",
        emerald: "#12B981",
        mint: "#5EEAB4",
        brand: "#1A7A5E",
        amber: "#F5A623",
        coral: "#F0603C",
        fog: "#E9F4EE",
        haze: "#9DB8AC",
        ink: "#0B1512",
        slate: "#5A6B63",
        wash: "#F4F8F6",
        line: "#E3ECE7",
        linedark: "rgba(255,255,255,0.09)"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"]
      },
      maxWidth: { page: "1180px" }
    }
  },
  plugins: []
};
export default config;
