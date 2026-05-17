import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Photo {
  src: string;
  caption: string;
  date: string;
  size: "tall" | "wide" | "square";
  tag: "prewedding" | "lamaran" | "keluarga";
  featured?: boolean;
}

const photos: Photo[] = [
  {
    src: "https://images.unsplash.com/photo-1596457221755-b96bc3a6df18?w=600&q=80",
    caption: "Momen spesial kami",
    date: "Januari 2026",
    size: "tall",
    tag: "prewedding",
    featured: true,
  },
  {
    src: "https://images.unsplash.com/photo-1562859135-3c009b776595?w=600&q=80",
    caption: "Cinta yang tulus",
    date: "Maret 2025",
    size: "square",
    tag: "prewedding",
  },
  {
    src: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=600&q=80",
    caption: "Rangkaian bunga indah",
    date: "Desember 2025",
    size: "square",
    tag: "lamaran",
  },
  {
    src: "https://images.unsplash.com/photo-1544717304-14d94551b7dc?w=600&q=80",
    caption: "Bersama selamanya",
    date: "Februari 2026",
    size: "wide",
    tag: "prewedding",
  },
  {
    src: "https://images.unsplash.com/photo-1607357910286-1ff94ac13c24?w=600&q=80",
    caption: "Kenangan terindah",
    date: "November 2025",
    size: "tall",
    tag: "lamaran",
  },
  {
    src: "https://images.unsplash.com/photo-1655901856612-a7f76949fb80?w=600&q=80",
    caption: "Penuh kebahagiaan",
    date: "Januari 2026",
    size: "square",
    tag: "keluarga",
  },
  {
    src: "https://images.unsplash.com/photo-1621621668101-d5c8329b3784?w=600&q=80",
    caption: "Keberkahan selalu",
    date: "Oktober 2025",
    size: "wide",
    tag: "keluarga",
  },
  {
    src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80",
    caption: "Cincin kami",
    date: "September 2025",
    size: "square",
    tag: "lamaran",
    featured: true,
  },
  {
    src: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=600&q=80",
    caption: "Keluarga besar",
    date: "Desember 2025",
    size: "wide",
    tag: "keluarga",
  },
];

type FilterTag = "all" | "prewedding" | "lamaran" | "keluarga";

const filters: { key: FilterTag; label: string }[] = [
  { key: "all", label: "Semua" },
  { key: "prewedding", label: "Pre-Wedding" },
  { key: "lamaran", label: "Lamaran" },
  { key: "keluarga", label: "Keluarga" },
];

const rotations = [-1.8, 1.2, -0.6, 1.5, -1.2, 0.8, -1.5, 1.0, -0.4];

/* ── Polaroid Card ── */
function PolaroidCard({
  photo,
  index,
  onClick,
}: {
  photo: Photo;
  index: number;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rot = rotations[index % rotations.length];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `scale(1.04) translateY(-6px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg)`;
    card.style.boxShadow = "0 20px 50px rgba(0,0,0,0.75), 0 6px 16px rgba(0,0,0,0.4)";
    card.style.zIndex = "20";
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = `rotate(${rot}deg)`;
    card.style.boxShadow = "0 6px 24px rgba(0,0,0,0.55), 0 2px 6px rgba(0,0,0,0.3)";
    card.style.zIndex = "1";
  };

  const aspectMap = {
    tall: "aspect-[3/4]",
    wide: "aspect-[4/3]",
    square: "aspect-square",
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12, scale: 0.95 }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: "easeOut" }}
      className="cursor-pointer relative break-inside-avoid mb-3 sm:mb-4 inline-block w-full"
      style={{
        transform: `rotate(${rot}deg)`,
        transition: "transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.35s ease",
        boxShadow: "0 6px 24px rgba(0,0,0,0.55), 0 2px 6px rgba(0,0,0,0.3)",
        background: "#f5efe6",
        padding: "8px 8px 32px",
        borderRadius: "2px",
        perspective: "600px",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      {/* Tape */}
      <div
        className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-12 h-4 rounded-sm"
        style={{ background: "rgba(201,169,110,0.22)" }}
      />

      {/* Gold pin for featured */}
      {photo.featured && (
        <div
          className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 z-10"
          style={{ background: "#c9a96e", borderColor: "#e8d5a3" }}
        />
      )}

      {/* Photo */}
      <div className={`overflow-hidden ${aspectMap[photo.size]}`}>
        <ImageWithFallback
          src={photo.src}
          alt={photo.caption}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Caption */}
      <p
        className="absolute bottom-0 left-0 right-0 text-center py-2 px-2 truncate text-xs italic"
        style={{ color: "#7a5a3a", fontFamily: "'Cormorant Garamond', serif" }}
      >
        {photo.caption}
      </p>
    </motion.div>
  );
}

/* ── Lightbox ── */
function Lightbox({
  photos,
  index,
  onClose,
  onNav,
}: {
  photos: Photo[];
  index: number;
  onClose: () => void;
  onNav: (dir: number) => void;
}) {
  const photo = photos[index];

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNav(-1);
      if (e.key === "ArrowRight") onNav(1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, onNav]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(10,4,6,0.97)" }}
      onClick={onClose}
    >
      {/* Close */}
      <button
        className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-sm transition-all duration-200 hover:scale-110"
        style={{ background: "rgba(201,169,110,0.15)", border: "1px solid rgba(201,169,110,0.3)", color: "#c9a96e" }}
        onClick={onClose}
      >
        <X size={16} />
      </button>

      {/* Nav + card */}
      <div
        className="flex items-center gap-3 sm:gap-5 px-4 w-full max-w-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 hover:scale-110"
          style={{ background: "rgba(201,169,110,0.1)", border: "1px solid rgba(201,169,110,0.25)", color: "#c9a96e" }}
          onClick={() => onNav(-1)}
        >
          <ChevronLeft size={20} />
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.88, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.88, rotate: 2 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="flex-1 relative"
            style={{
              background: "#f5efe6",
              padding: "12px 12px 52px",
              boxShadow: "0 24px 80px rgba(0,0,0,0.85)",
              borderRadius: "2px",
            }}
          >
            {/* Tape */}
            <div
              className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 rounded-sm"
              style={{ background: "rgba(201,169,110,0.25)" }}
            />

            <img
              src={photo.src}
              alt={photo.caption}
              className="w-full object-cover"
              style={{ aspectRatio: "4/3", display: "block" }}
            />

            <div className="absolute bottom-0 left-0 right-0 pb-3 text-center">
              <p
                className="text-sm italic mb-0.5"
                style={{ color: "#7a5a3a", fontFamily: "'Cormorant Garamond', serif" }}
              >
                {photo.caption}
              </p>
              <p
                className="text-xs tracking-widest"
                style={{ color: "#b09070", fontFamily: "'Lato', sans-serif" }}
              >
                {photo.date}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 hover:scale-110"
          style={{ background: "rgba(201,169,110,0.1)", border: "1px solid rgba(201,169,110,0.25)", color: "#c9a96e" }}
          onClick={() => onNav(1)}
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5">
        {photos.map((_, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-200"
            style={{
              width: i === index ? 20 : 6,
              height: 6,
              background: i === index ? "#c9a96e" : "rgba(201,169,110,0.3)",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

/* ── Main Gallery ── */
export function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterTag>("all");
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const filtered =
    activeFilter === "all" ? photos : photos.filter((p) => p.tag === activeFilter);

  const handleNav = useCallback(
    (dir: number) => {
      setLightboxIdx((i) =>
        i !== null ? (i + dir + filtered.length) % filtered.length : null
      );
    },
    [filtered.length]
  );

  return (
    <section
      id="galeri"
      ref={sectionRef}
      className="py-20 sm:py-24 relative overflow-hidden"
      style={{ background: "#0f0508" }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, #c9a96e, transparent)" }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-8 sm:mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p
            className="text-xs tracking-[0.5em] uppercase mb-3"
            style={{ color: "#c9a96e", fontFamily: "'Lato', sans-serif" }}
          >
            Foto Bersama
          </p>
          <h2
            className="text-5xl"
            style={{ fontFamily: "'Great Vibes', cursive", color: "#f5e6d0" }}
          >
            Galeri
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div
              className="h-px w-16"
              style={{ background: "linear-gradient(to right, transparent, #c9a96e)" }}
            />
            <Heart size={12} style={{ color: "#e8a0a0" }} fill="#e8a0a0" />
            <div
              className="h-px w-16"
              style={{ background: "linear-gradient(to left, transparent, #c9a96e)" }}
            />
          </div>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          className="flex justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 flex-wrap"
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className="px-4 sm:px-6 py-1.5 rounded-full text-xs tracking-widest uppercase transition-all duration-300"
              style={{
                fontFamily: "'Lato', sans-serif",
                background:
                  activeFilter === f.key ? "rgba(201,169,110,0.15)" : "transparent",
                border: `1px solid ${
                  activeFilter === f.key
                    ? "#c9a96e"
                    : "rgba(201,169,110,0.3)"
                }`,
                color: activeFilter === f.key ? "#c9a96e" : "#7a6050",
              }}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Masonry grid */}
        <div
          style={{
            columns: "3",
            columnGap: "14px",
          }}
          className="[column-count:2] sm:[column-count:3]"
        >
          <AnimatePresence>
            {filtered.map((photo, i) => (
              <PolaroidCard
                key={`${photo.src}-${activeFilter}`}
                photo={photo}
                index={i}
                onClick={() => setLightboxIdx(i)}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p
              className="text-sm italic"
              style={{ color: "#7a6050", fontFamily: "'Cormorant Garamond', serif" }}
            >
              Belum ada foto untuk kategori ini.
            </p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <Lightbox
            photos={filtered}
            index={lightboxIdx}
            onClose={() => setLightboxIdx(null)}
            onNav={handleNav}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
