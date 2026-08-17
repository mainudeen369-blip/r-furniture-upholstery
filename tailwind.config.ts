import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: {
          50: "#FBF6EA",
          100: "#F5EBD4",
          200: "#E8D4A8",
          300: "#D4AF37",
          400: "#C9A962",
          500: "#B8941F",
          600: "#9A7B1A",
        },
        brown: {
          950: "#1A0F0A",
          900: "#2D1810",
          800: "#3D2314",
          700: "#5C3D2E",
          600: "#7A5240",
        },
        cream: {
          50: "#FDFBF7",
          100: "#FAF7F2",
          200: "#F5F0E8",
          300: "#EDE4D4",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        script: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        arabic: ["var(--font-noto-arabic)", "Tahoma", "sans-serif"],
      },
      maxWidth: {
        site: "1280px",
      },
      boxShadow: {
        gold: "0 8px 32px rgba(201, 169, 98, 0.25)",
        card: "0 12px 40px rgba(45, 24, 16, 0.12)",
        nav: "0 4px 24px rgba(45, 24, 16, 0.08)",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #D4AF37 0%, #C9A962 50%, #B8941F 100%)",
        "cream-gradient": "linear-gradient(180deg, #FDFBF7 0%, #F5F0E8 100%)",
        "hero-pattern":
          "radial-gradient(ellipse at 20% 50%, rgba(212, 175, 55, 0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(92, 61, 46, 0.06) 0%, transparent 40%)",
      },
      animation: {
        shimmer: "shimmer 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-gold": "pulse-gold 2s ease-in-out infinite",
      },
      keyframes: {
        shimmer: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "pulse-gold": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(212, 175, 55, 0.4)" },
          "50%": { boxShadow: "0 0 0 12px rgba(212, 175, 55, 0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
