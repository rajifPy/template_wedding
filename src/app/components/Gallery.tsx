import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const photos = [
  {
    src: "https://images.unsplash.com/photo-1596457221755-b96bc3a6df18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY291cGxlJTIwcm9tYW50aWMlMjBlbGVnYW50fGVufDF8fHx8MTc3ODk0ODQ3M3ww&ixlib=rb-4.1.0&q=80&w=800",
    caption: "Momen spesial kami",
    mobileSpan: "",
    desktopSpan: "row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1562859135-3c009b776595?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHx3ZWRkaW5nJTIwY291cGxlJTIwcm9tYW50aWMlMjBlbGVnYW50fGVufDF8fHx8MTc3ODk0ODQ3M3ww&ixlib=rb-4.1.0&q=80&w=800",
    caption: "Cinta yang tulus",
    mobileSpan: "",
    desktopSpan: "",
  },
  {
    src: "https://images.unsplash.com/photo-1529636798458-92182e662485?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwZmxvd2VycyUyMGZsb3JhbCUyMGRlY29yYXRpb258ZW58MXx8fHwxNzc4OTQ4NDc0fDA&ixlib=rb-4.1.0&q=80&w=800",
    caption: "Rangkaian bunga indah",
    mobileSpan: "",
    desktopSpan: "",
  },
  {
    src: "https://images.unsplash.com/photo-1544717304-14d94551b7dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHx3ZWRkaW5nJTIwY291cGxlJTIwcm9tYW50aWMlMjBlbGVnYW50fGVufDF8fHx8MTc3ODk0ODQ3M3ww&ixlib=rb-4.1.0&q=80&w=800",
    caption: "Bersama selamanya",
    mobileSpan: "col-span-2",
    desktopSpan: "col-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1607357910286-1ff94ac13c24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHx3ZWRkaW5nJTIwY291cGxlJTIwcm9tYW50aWMlMjBlbGVnYW50fGVufDF8fHx8MTc3ODk0ODQ3M3ww&ixlib=rb-4.1.0&q=80&w=800",
    caption: "Kenangan terindah",
    mobileSpan: "",
    desktopSpan: "",
  },
  {
    src: "https://images.unsplash.com/photo-1655901856612-a7f76949fb80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHx3ZWRkaW5nJTIwY291cGxlJTIwcm9tYW50aWMlMjBlbGVnYW50fGVufDF8fHx8MTc3ODk0ODQ3M3ww&ixlib=rb-4.1.0&q=80&w=800",
    caption: "Penuh kebahagiaan",
    mobileSpan: "",
    desktopSpan: "",
  },
];

export function Gallery() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const prev = () => setLightbox((l) => (l !== null ? (l - 1 + photos.length) % photos.length : null));
  const next = () => setLightbox((l) => (l !== null ? (l + 1) % photos.length : null));

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <section
      id="galeri"
      ref={ref}
      className="py-20 sm:py-24 relative overflow-hidden"
      style={{ background: "#0f0508" }}
    >
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, #c9a96e, transparent)" }} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-10 sm:mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs tracking-[0.5em] uppercase mb-3" style={{ color: "#c9a96e", fontFamily: "'Lato', sans-serif" }}>
            Foto Bersama
          </p>
          <h2 className="text-5xl" style={{ fontFamily: "'Great Vibes', cursive", color: "#f5e6d0" }}>
            Galeri
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-16" style={{ background: "linear-gradient(to right, transparent, #c9a96e)" }} />
            <Heart size={12} style={{ color: "#e8a0a0" }} fill="#e8a0a0" />
            <div className="h-px w-16" style={{ background: "linear-gradient(to left, transparent, #c9a96e)" }} />
          </div>
        </motion.div>

        {/* Grid — 2 cols mobile, 3 cols desktop, fixed row height */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 auto-rows-[160px] sm:auto-rows-[200px]">
          {photos.map((photo, i) => (
            <motion.div
              key={i}
              className={`relative overflow-hidden rounded-xl cursor-pointer group ${photo.mobileSpan} md:${photo.desktopSpan}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={visible ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              onClick={() => setLightbox(i)}
            >
              <ImageWithFallback
                src={photo.src}
                alt={photo.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3"
                style={{ background: "linear-gradient(to top, rgba(26,10,14,0.8) 0%, transparent 60%)" }}
              >
                <p className="text-xs sm:text-sm" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#f5e6d0", fontStyle: "italic" }}>
                  {photo.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.95)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.div
              className="relative max-w-3xl w-full"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={photos[lightbox].src}
                alt={photos[lightbox].caption}
                className="max-h-[75vh] w-full rounded-xl object-contain"
              />
              <p className="text-center mt-3 text-sm" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#d4c0a5", fontStyle: "italic" }}>
                {photos[lightbox].caption}
              </p>
            </motion.div>

            <button
              className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: "rgba(201,169,110,0.2)", color: "#c9a96e" }}
              onClick={() => setLightbox(null)}
            >
              <X size={16} />
            </button>
            <button
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: "rgba(201,169,110,0.2)", color: "#c9a96e" }}
              onClick={(e) => { e.stopPropagation(); prev(); }}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: "rgba(201,169,110,0.2)", color: "#c9a96e" }}
              onClick={(e) => { e.stopPropagation(); next(); }}
            >
              <ChevronRight size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
