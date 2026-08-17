"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export function Gallery() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [active, setActive] = useState(0);

  return (
    <section id="gallery" className="section-padding">
      <div className="container-site" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-10 text-center sm:mb-14"
        >
          <h2 className="font-display text-3xl font-bold text-brown-900 sm:text-4xl md:text-5xl">
            {t.gallery.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-brown-600 sm:text-lg">
            {t.gallery.subtitle}
          </p>
        </motion.div>

        {/* Desktop: side tabs + large image */}
        <div className="hidden lg:grid lg:grid-cols-[1fr_1.4fr] lg:gap-8">
          <div className="flex flex-col gap-3">
            {t.gallery.items.map((item, i) => (
              <motion.button
                key={item.title}
                type="button"
                onClick={() => setActive(i)}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                className={`rounded-2xl border p-5 text-start transition-all duration-300 ${
                  active === i
                    ? "border-gold-400 bg-gold-50 shadow-gold"
                    : "border-gold-200/50 bg-white hover:border-gold-300"
                }`}
              >
                <h3 className="font-display text-lg font-bold text-brown-900">{item.title}</h3>
                <p className="mt-1 text-sm text-brown-600">{item.desc}</p>
              </motion.button>
            ))}
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-card">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Image
                  src={t.gallery.items[active].image}
                  alt={t.gallery.items[active].title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brown-900/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 start-0 p-8">
                  <h3 className="font-display text-2xl font-bold text-white">
                    {t.gallery.items[active].title}
                  </h3>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile / tablet: cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:hidden">
          {t.gallery.items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12 }}
              className="group overflow-hidden rounded-2xl shadow-card"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brown-900/70 via-brown-900/20 to-transparent" />
                <div className="absolute bottom-0 start-0 p-5">
                  <h3 className="font-display text-lg font-bold text-white sm:text-xl">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm text-cream-200">{item.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
