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

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${(i * 17 + 7) % 100}%`,
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

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.2]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.8], [0.55, 0.85]);
  const smoothContentY = useSpring(contentY, { stiffness: 100, damping: 30 });

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-[100dvh] overflow-hidden"
      aria-label="R Furniture Upholstery Dubai — Premium furniture upholstery services"
    >
      {/* AI cinematic background with parallax + Ken Burns */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 -top-[10%] h-[120%] w-full"
      >
        <Image
          src="/images/hero-img.jpeg"
          alt="Luxury furniture upholstery workshop in Dubai with premium fabrics and golden lighting"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </motion.div>

      {/* Layered overlays for depth */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-gradient-to-b from-brown-950/70 via-brown-900/50 to-brown-950/90"
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(212,175,55,0.18)_0%,transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,rgba(201,169,98,0.12)_0%,transparent_45%)]" />

      {/* Animated gold mesh grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(212,175,55,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.8) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating gold particles */}
      {PARTICLES.map((p) => (
        <motion.span
          key={p.id}
          className="pointer-events-none absolute rounded-full bg-gold-300/60 blur-[1px]"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            bottom: "-5%",
          }}
          animate={{
            y: [0, -800, -1600],
            opacity: [0, 0.8, 0],
            x: [0, (p.id % 2 === 0 ? 30 : -30), 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        />
      ))}

      {/* Main content — parallax on scroll */}
      <motion.div
        style={{ y: smoothContentY, opacity: contentOpacity }}
        className="relative z-10 flex min-h-[100dvh] flex-col pt-20 sm:pt-24"
      >
        <div className="container-site section-padding flex flex-1 flex-col justify-center">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: dir === "rtl" ? 60 : -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="order-2 lg:order-1"
            >
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-white/10 px-4 py-2 text-xs font-semibold text-gold-200 backdrop-blur-md sm:text-sm"
              >
                <Sparkles className="h-4 w-4 text-gold-300" />
                {t.hero.badge}
              </motion.div>

              <h1 className="mb-4">
                <motion.span
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.8 }}
                  className="font-script block text-4xl italic text-cream-100 sm:text-5xl md:text-6xl lg:text-7xl"
                >
                  {t.hero.title1}
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="font-display block text-5xl font-bold uppercase tracking-wide sm:text-6xl md:text-7xl lg:text-8xl"
                >
                  <span className="bg-gold-gradient bg-clip-text text-transparent drop-shadow-sm">
                    {t.hero.title2}
                  </span>
                </motion.span>
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.65 }}
                className="mb-8 max-w-lg text-base text-cream-200/90 sm:text-lg md:text-xl"
              >
                {t.hero.subtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.75 }}
                className="mb-8 inline-block rounded-2xl border border-gold-400/30 bg-brown-900/60 px-5 py-3 backdrop-blur-md sm:px-6 sm:py-4"
              >
                <p className="text-sm font-medium text-cream-100 sm:text-base">
                  {t.hero.ribbon}{" "}
                  <span className="font-script text-gold-300">{t.hero.ribbonAccent}</span>
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="flex flex-wrap gap-3 sm:gap-4"
              >
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  {t.hero.cta}
                  <ArrowRight className={`h-4 w-4 ${dir === "rtl" ? "rotate-180" : ""}`} />
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-gold-400/60 bg-white/10 px-6 py-3 text-sm font-semibold text-cream-100 backdrop-blur-sm transition-all hover:bg-white/20 sm:px-8 sm:py-3.5 sm:text-base"
                >
                  {t.hero.ctaSecondary}
                </a>
              </motion.div>
            </motion.div>

            {/* Hero image with glow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative order-1 flex justify-center lg:order-2"
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-6 rounded-full border border-dashed border-gold-400/30 sm:-inset-8"
                />
                <motion.div
                  animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.7, 0.4] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -inset-4 rounded-full bg-gold-400/20 blur-2xl"
                />
                <div className="relative h-72 w-72 overflow-hidden rounded-full ring-4 ring-gold-400/50 ring-offset-4 ring-offset-transparent sm:h-80 sm:w-80 md:h-96 md:w-96 lg:h-[28rem] lg:w-[28rem]">
                  <Image
                    src="/images/hero-upholstery.jpeg"
                    alt="Premium tufted armchair upholstery by R Furniture Dubai"
                    fill
                    className="object-cover object-top"
                    priority
                    sizes="(max-width: 768px) 288px, 448px"
                  />
                </div>
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-2 -end-2 rounded-2xl bg-gold-gradient px-4 py-3 shadow-gold sm:-bottom-4 sm:-end-4 sm:px-5 sm:py-4"
                >
                  <p className="text-xs font-bold text-brown-900 sm:text-sm">{t.stats.years}</p>
                  <p className="text-[10px] text-brown-800/80 sm:text-xs">{t.stats.yearsLabel}</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        <StatsBar />

        {/* Scroll indicator */}
        <motion.a
          href="#services"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{
            opacity: { delay: 1.5 },
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
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.1, duration: 0.7 }}
      className="container-site px-4 pb-8 sm:px-6 lg:px-8"
    >
      <div className="grid grid-cols-2 gap-3 rounded-2xl border border-gold-400/20 bg-white/10 p-4 backdrop-blur-md sm:grid-cols-4 sm:gap-4 sm:p-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 + i * 0.1 }}
            className="text-center"
          >
            <p className="font-display text-2xl font-bold text-gold-300 sm:text-3xl">{stat.value}</p>
            <p className="mt-1 text-xs text-cream-200/80 sm:text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
