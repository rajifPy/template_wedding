import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Heart } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const stories = [
  {
    year: "2019",
    title: "Pertemuan Pertama",
    desc: "Kami pertama kali bertemu di sebuah seminar kampus. Sebuah tatapan sederhana yang ternyata menjadi awal dari segalanya.",
    img: "https://images.unsplash.com/photo-1562859135-3c009b776595?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHx3ZWRkaW5nJTIwY291cGxlJTIwcm9tYW50aWMlMjBlbGVnYW50fGVufDF8fHx8MTc3ODk0ODQ3M3ww&ixlib=rb-4.1.0&q=80&w=400",
    align: "left",
  },
  {
    year: "2021",
    title: "Jatuh Cinta",
    desc: "Dua tahun bersahabat, kami akhirnya menyadari bahwa persahabatan ini telah tumbuh menjadi sesuatu yang lebih dalam.",
    img: "https://images.unsplash.com/photo-1607357910286-1ff94ac13c24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHx3ZWRkaW5nJTIwY291cGxlJTIwcm9tYW50aWMlMjBlbGVnYW50fGVufDF8fHx8MTc3ODk0ODQ3M3ww&ixlib=rb-4.1.0&q=80&w=400",
    align: "right",
  },
  {
    year: "2025",
    title: "Lamaran",
    desc: "Di bawah sinar bulan purnama, dengan cincin sederhana namun penuh makna, ia berlutut dan bertanya — dan jawabannya selalu 'Ya'.",
    img: "https://images.unsplash.com/photo-1655901856612-a7f76949fb80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHx3ZWRkaW5nJTIwY291cGxlJTIwcm9tYW50aWMlMjBlbGVnYW50fGVufDF8fHx8MTc3ODk0ODQ3M3ww&ixlib=rb-4.1.0&q=80&w=400",
    align: "left",
  },
  {
    year: "2026",
    title: "Pernikahan",
    desc: "Dan kini, kami siap melangkah ke babak baru kehidupan — bersama, selamanya.",
    img: "https://images.unsplash.com/photo-1544717304-14d94551b7dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHx3ZWRkaW5nJTIwY291cGxlJTIwcm9tYW50aWMlMjBlbGVnYW50fGVufDF8fHx8MTc3ODk0ODQ3M3ww&ixlib=rb-4.1.0&q=80&w=400",
    align: "right",
  },
];

function StoryCard({ story, index }: { story: typeof stories[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const isLeft = story.align === "left";

  return (
    <div ref={ref} className="relative mb-10 md:mb-16">

      {/* ── MOBILE LAYOUT (< md): vertical stack, left-aligned timeline ── */}
      <div className="flex md:hidden gap-4">
        {/* Left: timeline dot + line */}
        <div className="flex flex-col items-center flex-shrink-0">
          <motion.div
            className="w-9 h-9 rounded-full flex items-center justify-center z-10 flex-shrink-0"
            style={{
              background: "linear-gradient(135deg, #c9a96e, #e8d5a3)",
              boxShadow: "0 0 16px rgba(201,169,110,0.4)",
            }}
            initial={{ scale: 0 }}
            animate={visible ? { scale: 1 } : {}}
            transition={{ delay: 0.15, type: "spring" }}
          >
            <Heart size={13} style={{ color: "#fff" }} fill="#fff" />
          </motion.div>
          {/* vertical line below dot */}
          <div className="flex-1 w-px mt-2" style={{ background: "rgba(201,169,110,0.25)" }} />
        </div>

        {/* Right: card content */}
        <motion.div
          className="flex-1 pb-4"
          initial={{ opacity: 0, x: 24 }}
          animate={visible ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.25 + index * 0.08, duration: 0.6 }}
        >
          {/* Year badge */}
          <div
            className="inline-block px-3 py-0.5 rounded-full text-xs font-bold mb-3"
            style={{ background: "rgba(201,169,110,0.15)", color: "#c9a96e" }}
          >
            {story.year}
          </div>

          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: "rgba(255,248,240,0.05)",
              border: "1px solid rgba(201,169,110,0.2)",
            }}
          >
            <div className="h-44 overflow-hidden">
              <ImageWithFallback
                src={story.img}
                alt={story.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h3
                className="text-lg mb-1.5"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  color: "#f5e6d0",
                  fontWeight: 500,
                }}
              >
                {story.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ fontFamily: "'Lato', sans-serif", color: "#a09080", fontWeight: 300 }}
              >
                {story.desc}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── DESKTOP LAYOUT (≥ md): alternating left/right ── */}
      <div className="hidden md:flex items-center justify-center">
        {/* Timeline dot (centered) */}
        <div className="absolute left-1/2 -translate-x-1/2 z-10 flex flex-col items-center">
          <motion.div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #c9a96e, #e8d5a3)",
              boxShadow: "0 0 20px rgba(201,169,110,0.4)",
            }}
            initial={{ scale: 0 }}
            animate={visible ? { scale: 1 } : {}}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <Heart size={14} style={{ color: "#fff" }} fill="#fff" />
          </motion.div>
          <div
            className="text-xs mt-2 font-bold"
            style={{ color: "#c9a96e", fontFamily: "'Lato', sans-serif" }}
          >
            {story.year}
          </div>
        </div>

        {/* Card: left or right side */}
        <motion.div
          className={`w-5/12 ${isLeft ? "mr-auto pr-16" : "ml-auto pl-16"}`}
          initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
          animate={visible ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.3 + index * 0.1, duration: 0.7 }}
        >
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: "rgba(255,248,240,0.05)",
              border: "1px solid rgba(201,169,110,0.2)",
              backdropFilter: "blur(10px)",
            }}
          >
            <div className="h-48 overflow-hidden">
              <ImageWithFallback
                src={story.img}
                alt={story.title}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="p-5">
              <h3
                className="text-xl mb-2"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  color: "#f5e6d0",
                  fontWeight: 500,
                }}
              >
                {story.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ fontFamily: "'Lato', sans-serif", color: "#a09080", fontWeight: 300 }}
              >
                {story.desc}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export function OurStory() {
  return (
    <section
      id="cerita-kita"
      className="py-24 relative overflow-hidden"
      style={{ background: "#1a0a0e" }}
    >
      {/* Background dot pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: "radial-gradient(circle, #c9a96e 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-14">
          <p
            className="text-xs tracking-[0.5em] uppercase mb-3"
            style={{ color: "#c9a96e", fontFamily: "'Lato', sans-serif" }}
          >
            Perjalanan Kami
          </p>
          <h2
            className="text-5xl"
            style={{ fontFamily: "'Great Vibes', cursive", color: "#f5e6d0" }}
          >
            Cerita Kita
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
          <p
            className="mt-4 text-sm max-w-md mx-auto leading-relaxed px-4"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: "#9a8070",
              fontStyle: "italic",
            }}
          >
            "Cinta bukan tentang menemukan orang yang sempurna, tetapi tentang melihat orang yang
            tidak sempurna dengan cara yang sempurna."
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center vertical line — desktop only */}
          <div
            className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px"
            style={{
              background:
                "linear-gradient(to bottom, transparent, #c9a96e 20%, #c9a96e 80%, transparent)",
            }}
          />

          {stories.map((story, i) => (
            <StoryCard key={i} story={story} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
