"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import Image from "next/image";
import { ArrowRight, Sparkles, ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { WHATSAPP_LINK } from "@/lib/translations";

const PARTICLES = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: `${(i * 19 + 5) % 100}%`,
  delay: (i * 0.4) % 5,
  duration: 6 + (i % 4),
  size: 4 + (i % 3) * 2,
}));

export function Hero() {
  const { t, dir } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const smoothContentY = useSpring(contentY, { stiffness: 100, damping: 30 });

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-[100dvh] overflow-hidden bg-brown-950"
      aria-label="R Furniture Upholstery Dubai — Premium furniture upholstery services"
    >
      {/* Elegant background — gradient + subtle texture (not the busy flyer) */}
      <div className="absolute inset-0 bg-gradient-to-br from-brown-950 via-brown-900 to-brown-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(212,175,55,0.15)_0%,transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_70%,rgba(92,61,46,0.25)_0%,transparent_45%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(212,175,55,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.9) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {PARTICLES.map((p) => (
        <motion.span
          key={p.id}
          className="pointer-events-none absolute rounded-full bg-gold-300/40 blur-[1px]"
          style={{ left: p.left, width: p.size, height: p.size, bottom: "-5%" }}
          animate={{
            y: [0, -600, -1200],
            opacity: [0, 0.6, 0],
            x: [0, (p.id % 2 === 0 ? 20 : -20), 0],
          }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "linear" }}
        />
      ))}

      <motion.div
        style={{ y: smoothContentY, opacity: contentOpacity }}
        className="relative z-10 flex min-h-[100dvh] flex-col pt-20 sm:pt-24"
      >
        <div className="container-site section-padding flex flex-1 flex-col justify-center">
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
            {/* Text — always readable on solid glass panel */}
            <motion.div
              initial={{ opacity: 0, x: dir === "rtl" ? 40 : -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="order-2 rounded-3xl border border-gold-400/25 bg-brown-950/90 p-6 shadow-2xl backdrop-blur-xl sm:p-8 lg:order-1 lg:p-10"
            >
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-gold-400/10 px-4 py-2 text-xs font-semibold text-gold-200 sm:text-sm"
              >
                <Sparkles className="h-4 w-4 text-gold-300" />
                {t.hero.badge}
              </motion.div>

              <h1 className="mb-4">
                <motion.span
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="font-script block text-4xl italic text-cream-100 sm:text-5xl md:text-6xl"
                >
                  {t.hero.title1}
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="font-display block text-4xl font-bold uppercase tracking-wide sm:text-5xl md:text-6xl lg:text-7xl"
                >
                  <span className="bg-gold-gradient bg-clip-text text-transparent">
                    {t.hero.title2}
                  </span>
                </motion.span>
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55 }}
                className="mb-6 max-w-lg text-base leading-relaxed text-cream-200 sm:text-lg"
              >
                {t.hero.subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.65 }}
                className="mb-6 rounded-2xl border border-gold-400/25 bg-brown-900/80 px-4 py-3 sm:px-5 sm:py-4"
              >
                <p className="text-sm font-medium text-cream-100 sm:text-base">
                  {t.hero.ribbon}{" "}
                  <span className="font-script text-gold-300">{t.hero.ribbonAccent}</span>
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75 }}
                className="flex flex-wrap gap-3"
              >
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  {t.hero.cta}
                  <ArrowRight className={`h-4 w-4 ${dir === "rtl" ? "rotate-180" : ""}`} />
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-gold-400/60 bg-white/5 px-6 py-3 text-sm font-semibold text-cream-100 transition-all hover:bg-white/10 sm:px-8 sm:py-3.5 sm:text-base"
                >
                  {t.hero.ctaSecondary}
                </a>
              </motion.div>
            </motion.div>

            {/* Client flyer — full image visible, not cropped as background */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="order-1 lg:order-2"
            >
              <div className="relative mx-auto max-w-lg lg:max-w-none">
                <motion.div
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -inset-3 rounded-3xl bg-gold-400/20 blur-2xl"
                />
                <div className="relative overflow-hidden rounded-2xl border-2 border-gold-400/40 bg-brown-900 shadow-gold ring-1 ring-gold-300/20 sm:rounded-3xl">
                  <Image
                    src="/images/hero-bg.jpeg"
                    alt="R Furniture Upholstery Dubai — services, before and after, contact details"
                    width={1200}
                    height={1600}
                    className="h-auto w-full object-contain"
                    priority
                    sizes="(max-width: 1024px) 90vw, 540px"
                  />
                </div>
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-3 -end-3 rounded-xl bg-gold-gradient px-4 py-2.5 shadow-gold sm:-bottom-4 sm:-end-4"
                >
                  <p className="text-xs font-bold text-brown-900 sm:text-sm">{t.stats.years}</p>
                  <p className="text-[10px] text-brown-800/80">{t.stats.yearsLabel}</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        <StatsBar />

        <motion.a
          href="#services"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{
            opacity: { delay: 1.2 },
            y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          }}
          className="mb-8 flex flex-col items-center gap-1 text-gold-300/80"
          aria-label="Scroll to services"
        >
          <ChevronDown className="h-6 w-6" />
        </motion.a>
      </motion.div>
    </section>
  );
}

function StatsBar() {
  const { t } = useLanguage();
  const stats = [
    { value: t.stats.years, label: t.stats.yearsLabel },
    { value: t.stats.projects, label: t.stats.projectsLabel },
    { value: t.stats.fabrics, label: t.stats.fabricsLabel },
    { value: t.stats.rating, label: t.stats.ratingLabel },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9, duration: 0.7 }}
      className="container-site px-4 pb-8 sm:px-6 lg:px-8"
    >
      <div className="grid grid-cols-2 gap-3 rounded-2xl border border-gold-400/25 bg-brown-950/80 p-4 backdrop-blur-md sm:grid-cols-4 sm:gap-4 sm:p-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 + i * 0.08 }}
            className="text-center"
          >
            <p className="font-display text-xl font-bold text-gold-300 sm:text-2xl md:text-3xl">
              {stat.value}
            </p>
            <p className="mt-1 text-xs text-cream-200/80 sm:text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
