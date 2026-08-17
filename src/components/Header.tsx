"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MessageCircle } from "lucide-react";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLanguage } from "@/context/LanguageContext";
import { WHATSAPP_LINK } from "@/lib/translations";

const navIds = ["home", "services", "gallery", "about", "contact"] as const;
type NavId = (typeof navIds)[number];

function NavLink({
  id,
  label,
  scrolled,
  active,
}: {
  id: NavId;
  label: string;
  scrolled: boolean;
  active: boolean;
}) {
  return (
    <motion.a
      href={`#${id}`}
      className={`group relative overflow-hidden rounded-lg px-4 py-2 text-sm font-medium ${
        scrolled ? "text-brown-700" : "text-cream-100"
      } ${active ? (scrolled ? "text-gold-600" : "text-gold-300") : ""}`}
      whileHover={{ y: -2, scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
    >
      {/* Hover background glow */}
      <span
        className={`absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${
          scrolled ? "bg-gold-50" : "bg-white/10"
        }`}
      />
      <motion.span
        className="absolute inset-0 rounded-lg opacity-0"
        whileHover={{ opacity: 1 }}
        style={{
          background: scrolled
            ? "radial-gradient(circle at center, rgba(212,175,55,0.15) 0%, transparent 70%)"
            : "radial-gradient(circle at center, rgba(255,255,255,0.12) 0%, transparent 70%)",
        }}
      />

      <span className="relative z-10">{label}</span>

      {/* Animated underline */}
      <motion.span
        className="absolute bottom-1 start-1/2 h-0.5 -translate-x-1/2 rounded-full bg-gold-gradient"
        initial={false}
        animate={{ width: active ? "75%" : "0%" }}
        whileHover={{ width: "75%" }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />

      {/* Sparkle dot on hover */}
      <motion.span
        className="absolute end-1.5 top-1.5 h-1 w-1 rounded-full bg-gold-400"
        initial={{ opacity: 0, scale: 0 }}
        whileHover={{ opacity: 1, scale: [0, 1.4, 1] }}
        transition={{ duration: 0.35 }}
      />
    </motion.a>
  );
}

function MobileNavLink({
  id,
  label,
  onClick,
}: {
  id: NavId;
  label: string;
  onClick: () => void;
}) {
  return (
    <motion.a
      href={`#${id}`}
      onClick={onClick}
      className="relative w-full overflow-hidden rounded-xl px-4 py-3 text-base font-medium text-brown-800"
      whileHover={{ x: 4, backgroundColor: "rgba(245, 235, 212, 0.8)" }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <motion.span
        className="absolute start-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-full bg-gold-gradient opacity-0"
        whileHover={{ opacity: 1, height: "70%" }}
        transition={{ duration: 0.25 }}
      />
      <span className="relative">{label}</span>
    </motion.a>
  );
}

export function Header() {
  const { t, dir } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<NavId>("home");

  const navLabels = [
    t.nav.home,
    t.nav.services,
    t.nav.gallery,
    t.nav.about,
    t.nav.contact,
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveSection(visible[0].target.id as NavId);
        }
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: [0, 0.25, 0.5] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-cream-50/95 shadow-nav backdrop-blur-md"
          : "bg-gradient-to-b from-brown-950/40 to-transparent backdrop-blur-[2px]"
      }`}
    >
      <div className="container-site flex h-16 items-center justify-between px-4 sm:h-20 sm:px-6 lg:px-8">
        <Logo variant={scrolled ? "dark" : "light"} />

        <nav className="hidden items-center gap-1 lg:flex">
          {navIds.map((id, i) => (
            <NavLink
              key={id}
              id={id}
              label={navLabels[i]}
              scrolled={scrolled}
              active={activeSection === id}
            />
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher light={!scrolled} />
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold text-white shadow-md transition-transform hover:scale-105 sm:inline-flex"
          >
            <MessageCircle className="h-4 w-4" />
            {t.nav.whatsapp}
          </a>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`rounded-lg p-2 lg:hidden ${scrolled ? "text-brown-800" : "text-cream-100"}`}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-gold-200/50 bg-cream-50/98 backdrop-blur-lg lg:hidden"
          >
            <nav
              className={`container-site flex flex-col gap-1 px-4 py-4 ${dir === "rtl" ? "items-end" : ""}`}
            >
              {navIds.map((id, i) => (
                <MobileNavLink
                  key={id}
                  id={id}
                  label={navLabels[i]}
                  onClick={() => setMobileOpen(false)}
                />
              ))}
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-3 font-semibold text-white"
              >
                <MessageCircle className="h-5 w-5" />
                {t.nav.whatsapp}
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
