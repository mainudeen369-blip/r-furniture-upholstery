"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, Palette, Sparkles, Clock } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const icons = [Award, Palette, Sparkles, Clock];

export function Highlights() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="relative overflow-hidden bg-brown-900 section-padding">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.12)_0%,transparent_70%)]" />

      <div className="container-site relative" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-12 text-center font-display text-3xl font-bold text-cream-50 sm:mb-16 sm:text-4xl"
        >
          {t.highlights.title}
        </motion.h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {t.highlights.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -8 }}
                className="rounded-2xl border border-gold-400/20 bg-brown-800/50 p-6 text-center backdrop-blur-sm transition-shadow hover:shadow-gold"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gold-gradient">
                  <Icon className="h-7 w-7 text-brown-900" />
                </div>
                <h3 className="mb-2 font-display text-lg font-bold text-gold-300">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-cream-200/80">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
