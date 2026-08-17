"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Sofa,
  Wrench,
  Blinds,
  Building2,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { getWhatsAppUrl } from "@/lib/translations";

const iconMap = {
  sofa: Sofa,
  wrench: Wrench,
  blinds: Blinds,
  building: Building2,
} as const;

export function Services() {
  const { t, locale } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="relative section-padding bg-cream-gradient">
      {/* Scroll parallax decorative strip */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-brown-950/20 to-transparent" />
      <div className="container-site relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center sm:mb-16"
        >
          <span className="mb-3 inline-block rounded-full bg-gold-gradient px-5 py-1.5 text-xs font-bold uppercase tracking-widest text-brown-900 sm:text-sm">
            {t.services.title}
          </span>
          <h2 className="font-display mt-4 text-3xl font-bold text-brown-900 sm:text-4xl md:text-5xl">
            {t.services.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-brown-600 sm:text-lg">
            {t.services.subtitle}
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
          {t.services.categories.map((cat, catIndex) => {
            const Icon = iconMap[cat.icon as keyof typeof iconMap] ?? Sofa;
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: catIndex * 0.12 }}
                className="card-luxury group"
              >
                <div className="mb-5 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-gradient shadow-gold transition-transform duration-500 group-hover:scale-110">
                    <Icon className="h-7 w-7 text-brown-900" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display text-xl font-bold text-brown-900 sm:text-2xl">
                    {cat.title}
                  </h3>
                </div>

                <ul className="mb-6 space-y-2.5">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-brown-700 sm:text-base">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-gold-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={getWhatsAppUrl(
                    locale === "ar"
                      ? `مرحباً، أود الاستفسار عن: ${cat.title}`
                      : `Hello, I'd like to inquire about: ${cat.title}`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-gold-600 transition-colors hover:text-gold-500"
                >
                  <MessageCircle className="h-4 w-4" />
                  {t.services.cta}
                </a>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
