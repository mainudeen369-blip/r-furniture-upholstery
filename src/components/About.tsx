"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function About() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="about" className="section-padding bg-cream-200/50">
      <div className="container-site" ref={ref}>
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display mb-6 text-3xl font-bold text-brown-900 sm:text-4xl md:text-5xl">
              {t.about.title}
            </h2>

            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-gold-300 bg-white px-5 py-2.5 shadow-sm">
              <ShieldCheck className="h-5 w-5 text-gold-500" />
              <span className="text-sm font-semibold text-brown-800 sm:text-base">
                {t.about.badge}
              </span>
            </div>

            <p className="mb-5 text-base leading-relaxed text-brown-700 sm:text-lg">
              {t.about.p1}
            </p>
            <p className="text-base leading-relaxed text-brown-600 sm:text-lg">
              {t.about.p2}
            </p>
          </motion.div>

          {/* Decorative divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mx-auto mt-10 h-1 w-24 rounded-full bg-gold-gradient"
          />
        </div>
      </div>
    </section>
  );
}
