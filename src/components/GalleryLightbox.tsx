"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, Maximize2, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export type GalleryItem = {
  title: string;
  desc: string;
  image: string;
};

const MIN_SCALE = 1;
const MAX_SCALE = 4;

function getTouchDistance(
  t1: { clientX: number; clientY: number },
  t2: { clientX: number; clientY: number },
) {
  return Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
}

function ZoomableImage({
  src,
  alt,
  onZoomChange,
}: {
  src: string;
  alt: string;
  onZoomChange: (zoomed: boolean) => void;
}) {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const pinchRef = useRef({ startDist: 0, startScale: 1 });
  const panRef = useRef({ startX: 0, startY: 0, originX: 0, originY: 0, active: false });
  const lastTapRef = useRef(0);

  const applyScale = useCallback(
    (next: number) => {
      const clamped = Math.min(MAX_SCALE, Math.max(MIN_SCALE, next));
      setScale(clamped);
      onZoomChange(clamped > 1.02);
      if (clamped <= 1) setPos({ x: 0, y: 0 });
    },
    [onZoomChange],
  );

  const resetZoom = useCallback(() => {
    setScale(1);
    setPos({ x: 0, y: 0 });
    onZoomChange(false);
  }, [onZoomChange]);

  useEffect(() => {
    resetZoom();
  }, [src, resetZoom]);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const delta = e.deltaY > 0 ? -0.15 : 0.15;
    applyScale(scale + delta);
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (scale > 1.05) resetZoom();
    else applyScale(2.5);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation();
    if (e.touches.length === 2) {
      pinchRef.current = {
        startDist: getTouchDistance(e.touches[0], e.touches[1]),
        startScale: scale,
      };
      panRef.current.active = false;
    } else if (e.touches.length === 1 && scale > 1) {
      panRef.current = {
        startX: e.touches[0].clientX,
        startY: e.touches[0].clientY,
        originX: pos.x,
        originY: pos.y,
        active: true,
      };
    } else if (e.touches.length === 1) {
      const now = Date.now();
      if (now - lastTapRef.current < 300) {
        applyScale(scale > 1.05 ? 1 : 2.5);
      }
      lastTapRef.current = now;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const dist = getTouchDistance(e.touches[0], e.touches[1]);
      const ratio = dist / pinchRef.current.startDist;
      applyScale(pinchRef.current.startScale * ratio);
    } else if (e.touches.length === 1 && panRef.current.active && scale > 1) {
      e.preventDefault();
      const dx = e.touches[0].clientX - panRef.current.startX;
      const dy = e.touches[0].clientY - panRef.current.startY;
      setPos({ x: panRef.current.originX + dx, y: panRef.current.originY + dy });
    }
  };

  const handleTouchEnd = () => {
    panRef.current.active = false;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale <= 1) return;
    e.preventDefault();
    panRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      originX: pos.x,
      originY: pos.y,
      active: true,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!panRef.current.active || scale <= 1) return;
    const dx = e.clientX - panRef.current.startX;
    const dy = e.clientY - panRef.current.startY;
    setPos({ x: panRef.current.originX + dx, y: panRef.current.originY + dy });
  };

  const handleMouseUp = () => {
    panRef.current.active = false;
  };

  return (
    <div
      ref={containerRef}
      className="relative flex h-full min-h-[50vh] w-full flex-col sm:min-h-0"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onDoubleClick={handleDoubleClick}
      onClick={(e) => e.stopPropagation()}
      style={{ touchAction: "none" }}
    >
      <div className="relative flex-1 overflow-hidden rounded-2xl bg-brown-900/50 sm:rounded-3xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          draggable={false}
          className="h-full w-full select-none object-contain transition-transform duration-100 will-change-transform"
          style={{
            transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`,
            transformOrigin: "center center",
          }}
        />
      </div>

      {/* Zoom controls */}
      <div className="absolute end-3 top-3 z-20 flex flex-col gap-1.5 sm:end-4 sm:top-4">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            applyScale(scale + 0.5);
          }}
          className="rounded-full bg-brown-950/70 p-2 text-cream-100 backdrop-blur-sm transition-colors hover:bg-gold-500/40"
          aria-label={t.gallery.zoomIn}
        >
          <ZoomIn className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            applyScale(scale - 0.5);
          }}
          className="rounded-full bg-brown-950/70 p-2 text-cream-100 backdrop-blur-sm transition-colors hover:bg-gold-500/40"
          aria-label={t.gallery.zoomOut}
        >
          <ZoomOut className="h-4 w-4" />
        </button>
        {scale > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              resetZoom();
            }}
            className="rounded-full bg-brown-950/70 p-2 text-cream-100 backdrop-blur-sm transition-colors hover:bg-gold-500/40"
            aria-label={t.gallery.resetZoom}
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        )}
      </div>

      <p className="pointer-events-none absolute bottom-3 start-1/2 -translate-x-1/2 rounded-full bg-brown-950/60 px-3 py-1 text-[10px] text-cream-200/90 backdrop-blur-sm sm:text-xs">
        {t.gallery.pinchToZoom}
      </p>
    </div>
  );
}

type GalleryLightboxProps = {
  items: readonly GalleryItem[];
  initialIndex: number;
  onClose: (finalIndex: number) => void;
};

export function GalleryLightbox({ items, initialIndex, onClose }: GalleryLightboxProps) {
  const { t, dir } = useLanguage();
  const [index, setIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const go = useCallback(
    (next: number) => {
      setIsZoomed(false);
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
      if (isZoomed) return;
      if (e.key === "ArrowRight") dir === "rtl" ? goPrev() : goNext();
      if (e.key === "ArrowLeft") dir === "rtl" ? goNext() : goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, goNext, goPrev, dir, index, isZoomed]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (isZoomed) return;
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
      <div
        className="relative z-10 flex shrink-0 items-center justify-between px-4 py-4 sm:px-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="min-w-0 flex-1 pe-4">
          <h3 className="font-display text-lg font-bold text-cream-50 sm:text-xl">{item.title}</h3>
          <p className="line-clamp-2 text-sm text-cream-300/80 sm:line-clamp-none">{item.desc}</p>
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

      <div
        className="relative flex flex-1 items-center justify-center overflow-hidden px-4 pb-4 sm:px-16"
        onClick={() => !isZoomed && onClose(index)}
        role="presentation"
      >
        {!isZoomed && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="absolute start-2 z-20 rounded-full bg-white/10 p-2.5 text-cream-100 backdrop-blur-sm transition-all hover:scale-110 hover:bg-gold-500/30 sm:start-4 sm:p-3"
            aria-label={t.gallery.prev}
          >
            <ChevronLeft className={`h-6 w-6 ${dir === "rtl" ? "rotate-180" : ""}`} />
          </button>
        )}

        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={index}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            drag={isZoomed ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
            className="relative z-10 h-full w-full max-w-5xl"
          >
            <ZoomableImage src={item.image} alt={item.title} onZoomChange={setIsZoomed} />
          </motion.div>
        </AnimatePresence>

        {!isZoomed && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="absolute end-2 z-20 rounded-full bg-white/10 p-2.5 text-cream-100 backdrop-blur-sm transition-all hover:scale-110 hover:bg-gold-500/30 sm:end-4 sm:p-3"
            aria-label={t.gallery.next}
          >
            <ChevronRight className={`h-6 w-6 ${dir === "rtl" ? "rotate-180" : ""}`} />
          </button>
        )}
      </div>

      <div
        className="relative z-10 shrink-0 border-t border-white/10 px-4 py-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto flex max-w-4xl gap-2 overflow-x-auto pb-1">
          {items.map((thumb, i) => (
            <button
              key={thumb.image}
              type="button"
              onClick={() => go(i)}
              className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg transition-all sm:h-16 sm:w-24 ${
                i === index
                  ? "scale-105 ring-2 ring-gold-400 ring-offset-2 ring-offset-brown-950"
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
