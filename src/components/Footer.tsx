"use client";

import { motion } from "framer-motion";
import { Phone, MapPin, MessageCircle, Mail } from "lucide-react";
import { Logo } from "./Logo";
import { useLanguage } from "@/context/LanguageContext";
import { CONTACT_EMAIL, WHATSAPP_LINK } from "@/lib/translations";

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brown-900 text-cream-200">
      <div className="container-site px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <Logo className="[&_span]:text-cream-50 [&_.text-gold-500]:text-gold-300" />
            <p className="mt-4 text-sm leading-relaxed text-cream-300/80">
              {t.footer.tagline}
            </p>
            <p className="mt-3 font-display text-sm font-semibold tracking-widest text-gold-400">
              {t.brand.motto}
            </p>
          </div>

          <div className="space-y-3">
            <a
              href={`tel:${t.contact.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-3 text-sm transition-colors hover:text-gold-300 sm:text-base"
            >
              <Phone className="h-5 w-5 text-gold-400" />
              <span dir="ltr">{t.contact.phone}</span>
            </a>
            <div className="flex items-start gap-3 text-sm sm:text-base">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold-400" />
              <span>{t.contact.location}</span>
            </div>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="flex items-center gap-3 text-sm transition-colors hover:text-gold-300 sm:text-base"
            >
              <Mail className="h-5 w-5 text-gold-400" />
              <span dir="ltr">{CONTACT_EMAIL}</span>
            </a>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm transition-colors hover:text-gold-300 sm:text-base"
            >
              <MessageCircle className="h-5 w-5 text-gold-400" />
              WhatsApp
            </a>
          </div>

          <div className="sm:col-span-2 lg:col-span-1">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gold-400">
              Quick Links
            </p>
            <nav className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
              {["home", "services", "gallery", "about", "contact"].map((id) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="transition-colors hover:text-gold-300"
                >
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-10 border-t border-brown-700 pt-6 text-center text-xs text-cream-400 sm:text-sm">
          © {year} R Furniture Upholstery. {t.footer.rights}
        </div>
      </div>
    </footer>
  );
}

export function WhatsAppFloat() {
  return (
    <motion.a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-5 end-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg animate-pulse-gold sm:bottom-8 sm:end-8 sm:h-16 sm:w-16"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-7 w-7 sm:h-8 sm:w-8" />
    </motion.a>
  );
}
