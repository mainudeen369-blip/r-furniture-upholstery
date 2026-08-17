"use client";

import { motion } from "framer-motion";
import { Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function LanguageSwitcher({ light = false }: { light?: boolean }) {
  const { locale, toggleLocale } = useLanguage();

  return (
    <motion.button
      type="button"
      onClick={toggleLocale}
      whileTap={{ scale: 0.95 }}
      className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold shadow-sm backdrop-blur-sm transition-colors sm:px-4 sm:py-2 sm:text-sm ${
        light
          ? "border-gold-400/40 bg-white/10 text-cream-100 hover:bg-white/20"
          : "border-gold-300/60 bg-white/90 text-brown-800 hover:border-gold-400 hover:bg-gold-50"
      }`}
      aria-label={locale === "en" ? "Switch to Arabic" : "Switch to English"}
    >
      <Globe className="h-3.5 w-3.5 text-gold-500 sm:h-4 sm:w-4" />
      <span>{locale === "en" ? "العربية" : "English"}</span>
    </motion.button>
  );
}
