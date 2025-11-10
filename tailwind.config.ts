import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import aspectRatio from "@tailwindcss/aspect-ratio";

const withOpacity = (variable: string) =>
  `rgb(var(${variable}) / <alpha-value>)`;

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{ts,tsx,js,jsx,mdx}",
    "./content/**/*.{md,mdx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        md: "1.5rem",
        lg: "2rem",
      },
    },
    extend: {
      colors: {
        brand: {
          primary: withOpacity("--brand-primary"),
          secondary: withOpacity("--brand-secondary"),
          accent: withOpacity("--brand-accent"),
          plum: withOpacity("--brand-plum"),
        },
        surface: {
          base: "var(--color-surface)",
          muted: "var(--color-card)",
          dark: "var(--color-background)",
        },
        text: {
          DEFAULT: "var(--color-foreground)",
          muted: "var(--color-muted)",
          inverted: "var(--color-surface)",
        },
        border: "var(--color-border)",
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Playfair Display", "serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      maxWidth: {
        prose: "720px",
        content: "1280px",
      },
      backgroundImage: {
        hero: "radial-gradient(circle at top, rgba(107, 70, 193, 0.25), transparent 70%)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg, var(--tw-gradient-stops))",
      },
      boxShadow: {
        glow: "0 15px 45px 0 rgba(107, 70, 193, 0.25)",
        subtle: "0 5px 20px rgba(15, 23, 42, 0.08)",
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-in-out",
        "slide-up": "slideUp 0.45s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0", transform: "translateY(6px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(18px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [typography, forms, aspectRatio],
};

export default config;
