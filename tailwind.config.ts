import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";
import daisyui from "daisyui";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      textColor: {
        foreground: "hsl(var(--foreground) / <alpha-value>)",
      },
      backgroundColor: {
        background: "hsl(var(--background) / <alpha-value>)",
      },
      colors: {
        border: {
          DEFAULT: "hsl(var(--border) / <alpha-value>)",
        },
        input: {
          DEFAULT: "hsl(var(--input) / <alpha-value>)",
        },
        ring: {
          DEFAULT: "hsl(var(--ring) / <alpha-value>)",
        },
        background: {
          DEFAULT: "hsl(var(--background) / <alpha-value>)",
        },
        foreground: {
          DEFAULT: "hsl(var(--foreground) / <alpha-value>)",
        },
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",
          foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
          foreground: "hsl(var(--secondary-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "hsl(var(--popover) / <alpha-value>)",
          foreground: "hsl(var(--popover-foreground) / <alpha-value>)",
        },
        card: {
          DEFAULT: "hsl(var(--card) / <alpha-value>)",
          foreground: "hsl(var(--card-foreground) / <alpha-value>)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [animate, daisyui],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#0056D6",
          secondary: "#F26E22",
          accent: "#00BFA5",
          neutral: "#2A323C",
          "base-100": "#FFFFFF",
        },
        dark: {
          primary: "#3B82F6",
          secondary: "#F26E22",
          accent: "#00BFA5",
          neutral: "#191D24",
          "base-100": "#1F2937",
        },
      },
    ],
  },
};

export default config; 