import { motion } from "motion/react";
import { Heart, ChevronDown } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-end justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1596457221755-b96bc3a6df18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwY291cGxlJTIwcm9tYW50aWMlMjBlbGVnYW50fGVufDF8fHx8MTc3ODk0ODQ3M3ww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Wedding couple"
          className="w-full h-full object-cover object-top"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(26,10,14,0.95) 0%, rgba(26,10,14,0.4) 50%, rgba(26,10,14,0.2) 100%)" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center pb-20 px-6 w-full max-w-2xl mx-auto">
        <motion.p
          className="text-xs tracking-[0.5em] uppercase mb-6"
          style={{ color: "#c9a96e", fontFamily: "'Lato', sans-serif" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          The Wedding of
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9 }}
        >
          <h1
            className="text-7xl md:text-8xl leading-none"
            style={{ fontFamily: "'Great Vibes', cursive", color: "#f5e6d0" }}
          >
            Reza
          </h1>
          <div className="flex items-center justify-center gap-4 my-4">
            <div className="h-px flex-1 max-w-[80px]" style={{ background: "linear-gradient(to right, transparent, #c9a96e)" }} />
            <Heart size={16} style={{ color: "#e8a0a0" }} fill="#e8a0a0" />
            <div className="h-px flex-1 max-w-[80px]" style={{ background: "linear-gradient(to left, transparent, #c9a96e)" }} />
          </div>
          <h1
            className="text-7xl md:text-8xl leading-none"
            style={{ fontFamily: "'Great Vibes', cursive", color: "#f5e6d0" }}
          >
            Salsabila
          </h1>
        </motion.div>

        <motion.div
          className="mt-8 space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <p className="text-lg" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#d4c5b5", fontStyle: "italic" }}>
            Sabtu, 14 Juni 2026
          </p>
          <p className="text-sm tracking-wider" style={{ fontFamily: "'Lato', sans-serif", color: "#9a7878", fontWeight: 300 }}>
            Gedung Graha Saba, Solo, Jawa Tengah
          </p>
        </motion.div>

        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.8 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown size={24} style={{ color: "#c9a96e" }} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
