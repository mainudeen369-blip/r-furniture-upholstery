"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { GalleryLightbox, GalleryExpandHint } from "./GalleryLightbox";

const SLIDE_INTERVAL = 4500;

export function Gallery() {
  const { t, dir } = useLanguage();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const items = t.gallery.items;

  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > active ? 1 : -1);
      setActive((index + items.length) % items.length);
      setProgress(0);
    },
    [active, items.length],
  );

  const goNext = useCallback(() => goTo(active + 1), [goTo, active]);
  const goPrev = useCallback(() => goTo(active - 1), [goTo, active]);

  // Auto slideshow with progress bar
  useEffect(() => {
    if (paused || lightboxOpen) return;

    const tick = 50;
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          goNext();
          return 0;
        }
        return p + (tick / SLIDE_INTERVAL) * 100;
      });
    }, tick);

    return () => clearInterval(timer);
  }, [paused, lightboxOpen, goNext, active]);

  const openLightbox = (index: number) => {
    setActive(index);
    setProgress(0);
    setLightboxOpen(true);
  };

  const slideVariants = {
    enter: (d: number) => ({
      x: d > 0 ? "60%" : "-60%",
      opacity: 0,
      scale: 1.08,
      filter: "blur(8px)",
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
    },
    exit: (d: number) => ({
      x: d > 0 ? "-60%" : "60%",
      opacity: 0,
      scale: 0.92,
      filter: "blur(8px)",
    }),
  };

  return (
    <section id="gallery" className="section-padding overflow-hidden bg-cream-200/30">
      <div className="container-site" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="mb-8 text-center sm:mb-12"
        >
          <h2 className="font-display text-3xl font-bold text-brown-900 sm:text-4xl md:text-5xl">
            {t.gallery.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-brown-600 sm:text-lg">
            {t.gallery.subtitle}
          </p>
        </motion.div>

        {/* Main auto-slideshow */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15 }}
          className="relative mx-auto max-w-5xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            className="group relative aspect-[16/10] cursor-pointer overflow-hidden rounded-3xl shadow-card ring-1 ring-gold-200/50 sm:aspect-[16/9]"
            onClick={() => openLightbox(active)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && openLightbox(active)}
            aria-label={t.gallery.viewFullscreen}
          >
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={active}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <motion.div
                  className="relative h-full w-full"
                  animate={{ scale: [1, 1.06, 1] }}
                  transition={{ duration: SLIDE_INTERVAL / 1000, ease: "linear" }}
                >
                  <Image
                    src={items[active].image}
                    alt={items[active].title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 1024px"
                    priority={active === 0}
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-brown-950/80 via-brown-900/20 to-transparent" />
                <div className="absolute bottom-0 start-0 end-0 p-5 sm:p-8">
                  <GalleryExpandHint />
                  <h3 className="mt-2 font-display text-xl font-bold text-white sm:text-3xl">
                    {items[active].title}
                  </h3>
                  <p className="mt-1 max-w-lg text-sm text-cream-200/90 sm:text-base">
                    {items[active].desc}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Nav arrows */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className="absolute start-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-brown-950/50 p-2 text-white opacity-0 backdrop-blur-sm transition-all hover:bg-gold-500/40 group-hover:opacity-100 sm:start-4 sm:p-2.5"
              aria-label={t.gallery.prev}
            >
              <ChevronLeft className={`h-5 w-5 ${dir === "rtl" ? "rotate-180" : ""}`} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="absolute end-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-brown-950/50 p-2 text-white opacity-0 backdrop-blur-sm transition-all hover:bg-gold-500/40 group-hover:opacity-100 sm:end-4 sm:p-2.5"
              aria-label={t.gallery.next}
            >
              <ChevronRight className={`h-5 w-5 ${dir === "rtl" ? "rotate-180" : ""}`} />
            </button>

            {/* Progress bar */}
            <div className="absolute inset-x-0 bottom-0 h-1 bg-brown-950/30">
              <motion.div
                className="h-full bg-gold-gradient"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.05 }}
              />
            </div>
          </div>

          {/* Controls row */}
          <div className="mt-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === active ? "w-8 bg-gold-500" : "w-2 bg-gold-300/50 hover:bg-gold-400"
                  }`}
                  aria-label={`${t.gallery.slideOf} ${i + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              className="flex items-center gap-1.5 rounded-full border border-gold-300/60 bg-white px-3 py-1.5 text-xs font-medium text-brown-700 transition-colors hover:bg-gold-50 sm:text-sm"
            >
              {paused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
              {paused ? t.gallery.play : t.gallery.pause}
            </button>
          </div>
        </motion.div>

        {/* Thumbnail grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-7"
        >
          {items.map((item, i) => (
            <motion.button
              key={item.image}
              type="button"
              onClick={() => openLightbox(i)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.35 + i * 0.06 }}
              whileHover={{ y: -6, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`group/thumb relative aspect-[4/3] overflow-hidden rounded-xl shadow-md transition-shadow hover:shadow-gold ${
                i === active ? "ring-2 ring-gold-400 ring-offset-2" : ""
              }`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover/thumb:scale-110"
                sizes="(max-width: 640px) 50vw, 200px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brown-900/80 via-transparent to-transparent opacity-80 transition-opacity group-hover/thumb:opacity-100" />
              <div className="absolute bottom-0 start-0 end-0 p-2 text-start">
                <p className="line-clamp-2 text-[10px] font-semibold leading-tight text-white sm:text-xs">
                  {item.title}
                </p>
              </div>
              {i === active && (
                <motion.span
                  layoutId="gallery-active-indicator"
                  className="absolute inset-x-0 top-0 h-1 bg-gold-gradient"
                />
              )}
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Fullscreen lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <GalleryLightbox
            key={`lightbox-${active}`}
            items={items}
            initialIndex={active}
            onClose={(finalIndex) => {
              setActive(finalIndex);
              setProgress(0);
              setLightboxOpen(false);
            }}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
