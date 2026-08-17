"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export type GalleryItem = {
  title: string;
  desc: string;
  image: string;
};

type GalleryLightboxProps = {
  items: readonly GalleryItem[];
  initialIndex: number;
  onClose: (finalIndex: number) => void;
};

export function GalleryLightbox({ items, initialIndex, onClose }: GalleryLightboxProps) {
  const { t, dir } = useLanguage();
  const [index, setIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(0);

  const go = useCallback(
    (next: number) => {
      setDirection(next > index ? 1 : -1);
      setIndex((next + items.length) % items.length);
    },
    [index, items.length],
  );

  const goNext = useCallback(() => go(index + 1), [go, index]);
  const goPrev = useCallback(() => go(index - 1), [go, index]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose(index);
      if (e.key === "ArrowRight") dir === "rtl" ? goPrev() : goNext();
      if (e.key === "ArrowLeft") dir === "rtl" ? goNext() : goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, goNext, goPrev, dir]);

  useEffect(() => {
    const timer = setInterval(goNext, 5000);
    return () => clearInterval(timer);
  }, [goNext]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const threshold = 80;
    if (info.offset.x < -threshold) dir === "rtl" ? goPrev() : goNext();
    else if (info.offset.x > threshold) dir === "rtl" ? goNext() : goPrev();
  };

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0, scale: 0.95 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0, scale: 0.95 }),
  };

  const item = items[index];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex flex-col bg-brown-950/97 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between px-4 py-4 sm:px-6">
        <div className="min-w-0 flex-1 pe-4">
          <h3 className="truncate font-display text-lg font-bold text-cream-50 sm:text-xl">
            {item.title}
          </h3>
          <p className="truncate text-sm text-cream-300/80">{item.desc}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden text-sm text-gold-400 sm:block">
            {index + 1} / {items.length}
          </span>
          <button
            type="button"
            onClick={() => onClose(index)}
            className="rounded-full bg-white/10 p-2.5 text-cream-100 transition-colors hover:bg-white/20"
            aria-label={t.gallery.close}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Main image */}
      <div className="relative flex flex-1 items-center justify-center overflow-hidden px-4 pb-4 sm:px-16">
        <button
          type="button"
          onClick={goPrev}
          className="absolute start-2 z-20 rounded-full bg-white/10 p-2.5 text-cream-100 backdrop-blur-sm transition-all hover:scale-110 hover:bg-gold-500/30 sm:start-4 sm:p-3"
          aria-label={t.gallery.prev}
        >
          <ChevronLeft className={`h-6 w-6 ${dir === "rtl" ? "rotate-180" : ""}`} />
        </button>

        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={index}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
            className="relative h-full w-full max-w-5xl cursor-grab active:cursor-grabbing"
          >
            <div className="relative h-full min-h-[50vh] w-full overflow-hidden rounded-2xl shadow-2xl ring-1 ring-gold-400/20 sm:min-h-0 sm:rounded-3xl">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-contain bg-brown-900/50"
                sizes="(max-width: 768px) 100vw, 80vw"
                priority
              />
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          onClick={goNext}
          className="absolute end-2 z-20 rounded-full bg-white/10 p-2.5 text-cream-100 backdrop-blur-sm transition-all hover:scale-110 hover:bg-gold-500/30 sm:end-4 sm:p-3"
          aria-label={t.gallery.next}
        >
          <ChevronRight className={`h-6 w-6 ${dir === "rtl" ? "rotate-180" : ""}`} />
        </button>
      </div>

      {/* Thumbnail strip */}
      <div className="shrink-0 border-t border-white/10 px-4 py-4">
        <div className="mx-auto flex max-w-4xl gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {items.map((thumb, i) => (
            <button
              key={thumb.image}
              type="button"
              onClick={() => go(i)}
              className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg transition-all sm:h-16 sm:w-24 ${
                i === index
                  ? "ring-2 ring-gold-400 ring-offset-2 ring-offset-brown-950 scale-105"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              <Image src={thumb.image} alt={thumb.title} fill className="object-cover" sizes="96px" />
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function GalleryExpandHint() {
  const { t } = useLanguage();
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-brown-900/60 px-3 py-1 text-xs text-cream-200 backdrop-blur-sm">
      <Maximize2 className="h-3 w-3" />
      {t.gallery.tapToExpand}
    </span>
  );
}
