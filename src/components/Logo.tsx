"use client";

import { motion } from "framer-motion";
import { Armchair } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function Logo({
  className = "",
  variant = "dark",
}: {
  className?: string;
  variant?: "light" | "dark";
}) {
  const { t } = useLanguage();
  const isLight = variant === "light";

  return (
    <motion.a
      href="#home"
      className={`group relative flex items-center gap-2.5 ${className}`}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      {/* Icon container with default + hover animation */}
      <div className="relative">
        {/* Pulsing outer ring — always animating */}
        <motion.span
          className="absolute inset-0 rounded-full border-2 border-gold-400/50"
          animate={{
            scale: [1, 1.35, 1],
            opacity: [0.6, 0, 0.6],
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Rotating dashed ring */}
        <motion.span
          className="absolute -inset-1.5 rounded-full border border-dashed border-gold-400/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />

        {/* Glow on hover */}
        <span className="absolute -inset-2 rounded-full bg-gold-400/0 blur-md transition-all duration-500 group-hover:bg-gold-400/40" />

        <motion.div
          animate={{
            y: [0, -3, 0],
            boxShadow: [
              "0 4px 20px rgba(201, 169, 98, 0.35)",
              "0 8px 28px rgba(212, 175, 55, 0.55)",
              "0 4px 20px rgba(201, 169, 98, 0.35)",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{
            rotate: [0, -10, 10, -5, 0],
            scale: 1.12,
            transition: { duration: 0.55 },
          }}
          className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gold-gradient sm:h-11 sm:w-11"
        >
          {/* Shimmer sweep */}
          <motion.span
            className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12"
            animate={{ translateX: ["-100%", "200%"] }}
            transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut" }}
          />
          <motion.span
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Armchair className="relative h-5 w-5 text-brown-900 sm:h-6 sm:w-6" strokeWidth={1.5} />
          </motion.span>
        </motion.div>
      </div>

      {/* Brand text */}
      <div className="leading-tight">
        <motion.span
          className={`font-display block text-lg font-bold tracking-wide sm:text-xl ${
            isLight ? "text-cream-50" : "text-brown-900"
          }`}
          animate={{ letterSpacing: ["0.02em", "0.06em", "0.02em"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="relative inline-block transition-colors duration-300 group-hover:text-gold-500">
            {t.brand.name}
            <span className="absolute -bottom-0.5 start-0 h-0.5 w-0 rounded-full bg-gold-gradient transition-all duration-300 group-hover:w-full" />
          </span>
        </motion.span>
        <span
          className={`block text-[10px] font-semibold uppercase tracking-[0.25em] transition-all duration-300 group-hover:tracking-[0.32em] sm:text-xs ${
            isLight ? "text-gold-300 group-hover:text-gold-200" : "text-gold-500 group-hover:text-gold-400"
          }`}
        >
          {t.brand.tagline}
        </span>
      </div>
    </motion.a>
  );
}
