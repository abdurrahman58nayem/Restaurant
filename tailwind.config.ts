import type { Config } from "tailwindcss";

/**
 * NOORÉ — brand design tokens
 * Warm Cream / Ivory / Deep Charcoal / Dark Brown / Terracotta / Muted Gold / Soft Beige
 * Gold is intentionally a very limited accent colour.
 */
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: "#FBF7F0",
          50: "#FDFBF7",
          100: "#FBF7F0",
          200: "#F6EFE3",
          300: "#EFE6D8",
        },
        sand: {
          DEFAULT: "#E4D6C1",
          100: "#EFE6D8",
          200: "#E4D6C1",
          300: "#D6C3A8",
          400: "#C3AC8C",
        },
        clay: {
          DEFAULT: "#B4552F",
          50: "#FBF0EA",
          100: "#F5DFD3",
          200: "#E8B99F",
          300: "#D98F6A",
          400: "#C6714A",
          500: "#B4552F",
          600: "#9A4525",
          700: "#7C371D",
          800: "#5E2915",
        },
        charcoal: {
          DEFAULT: "#1C1A17",
          50: "#6B655D",
          100: "#4A443C",
          200: "#332E28",
          300: "#26221D",
          400: "#1C1A17",
          500: "#151310",
        },
        cocoa: {
          DEFAULT: "#3B2A20",
          100: "#8A6E5B",
          200: "#6B5040",
          300: "#513A2C",
          400: "#3B2A20",
          500: "#2A1D15",
        },
        gold: {
          DEFAULT: "#B08D57",
          100: "#EFE4CE",
          200: "#DCC49A",
          300: "#C6A877",
          400: "#B08D57",
          500: "#947444",
        },
        leaf: {
          DEFAULT: "#4E6B4A",
          light: "#7C9778",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        bengali: ["var(--font-bengali)", "var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        brand: "0.24em",
      },
      maxWidth: {
        shell: "80rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(28,26,23,0.04), 0 10px 30px -14px rgba(28,26,23,0.18)",
        lift: "0 18px 45px -20px rgba(28,26,23,0.35)",
        plate: "inset 0 0 0 1px rgba(176,141,87,0.18)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translate3d(0,18px,0)" },
          "100%": { opacity: "1", transform: "translate3d(0,0,0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-in": {
          "0%": { transform: "translate3d(100%,0,0)" },
          "100%": { transform: "translate3d(0,0,0)" },
        },
        "slide-in-left": {
          "0%": { transform: "translate3d(-100%,0,0)" },
          "100%": { transform: "translate3d(0,0,0)" },
        },
        "toast-in": {
          "0%": { opacity: "0", transform: "translate3d(0,14px,0) scale(0.97)" },
          "100%": { opacity: "1", transform: "translate3d(0,0,0) scale(1)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both",
        "fade-in": "fade-in 0.6s ease-out both",
        "slide-in": "slide-in 0.32s cubic-bezier(0.22,1,0.36,1) both",
        "slide-in-left": "slide-in-left 0.32s cubic-bezier(0.22,1,0.36,1) both",
        "toast-in": "toast-in 0.28s cubic-bezier(0.22,1,0.36,1) both",
      },
    },
  },
  plugins: [],
};

export default config;
