import { motion, AnimatePresence } from "motion/react";
import { Heart } from "lucide-react";

interface CoverPageProps {
  onOpen: () => void;
}

export function CoverPage({ onOpen }: CoverPageProps) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1a0a0e 0%, #3d1a23 40%, #6b2d3e 100%)" }}
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {/* Animated petals background */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              width: Math.random() * 8 + 4,
              height: Math.random() * 8 + 4,
              background: "#e8b4b8",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Gold ornament top */}
        <div className="absolute top-0 left-0 right-0 flex justify-center pt-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <svg width="200" height="60" viewBox="0 0 200 60" fill="none">
              <path d="M100 5 L110 25 L130 25 L115 38 L122 58 L100 45 L78 58 L85 38 L70 25 L90 25 Z" fill="none" stroke="#c9a96e" strokeWidth="1" opacity="0.5"/>
              <path d="M10 30 Q50 10 100 30 Q150 50 190 30" stroke="#c9a96e" strokeWidth="1" fill="none" opacity="0.4"/>
              <path d="M10 35 Q50 15 100 35 Q150 55 190 35" stroke="#c9a96e" strokeWidth="0.5" fill="none" opacity="0.3"/>
            </svg>
          </motion.div>
        </div>

        {/* Main content */}
        <div className="text-center px-8 max-w-sm mx-auto">
          <motion.p
            className="text-xs tracking-[0.4em] uppercase mb-4"
            style={{ color: "#c9a96e", fontFamily: "'Lato', sans-serif" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Undangan Pernikahan
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <h1
              className="text-6xl mb-2 leading-none"
              style={{ fontFamily: "'Great Vibes', cursive", color: "#f5e6d0" }}
            >
              Reza
            </h1>
            <div className="flex items-center justify-center gap-3 my-3">
              <div className="h-px w-16" style={{ background: "#c9a96e" }} />
              <Heart size={14} style={{ color: "#e8a0a0" }} fill="#e8a0a0" />
              <div className="h-px w-16" style={{ background: "#c9a96e" }} />
            </div>
            <h1
              className="text-6xl leading-none"
              style={{ fontFamily: "'Great Vibes', cursive", color: "#f5e6d0" }}
            >
              Salsabila
            </h1>
          </motion.div>

          <motion.p
            className="mt-6 text-sm tracking-widest"
            style={{ color: "#d4a5a5", fontFamily: "'Lato', sans-serif", fontWeight: 300 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            Sabtu, 14 Juni 2026
          </motion.p>

          <motion.div
            className="mt-2 text-xs tracking-widest"
            style={{ color: "#a07878", fontFamily: "'Lato', sans-serif" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.8 }}
          >
            Gedung Graha Saba • Solo, Jawa Tengah
          </motion.div>

          {/* Envelope open button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-10"
          >
            <motion.button
              onClick={onOpen}
              className="relative px-10 py-4 text-sm tracking-[0.3em] uppercase overflow-hidden cursor-pointer"
              style={{
                fontFamily: "'Lato', sans-serif",
                color: "#1a0a0e",
                background: "linear-gradient(135deg, #c9a96e, #e8d5a3)",
                borderRadius: "2px",
                border: "none",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              <motion.span
                className="absolute inset-0"
                style={{ background: "rgba(255,255,255,0.2)" }}
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.4 }}
              />
              Buka Undangan
            </motion.button>
          </motion.div>

          <motion.p
            className="mt-4 text-xs"
            style={{ color: "#7a5a5a", fontFamily: "'Lato', sans-serif" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
          >
            Kepada Yth. Bapak/Ibu/Saudara/i
          </motion.p>
        </div>

        {/* Gold ornament bottom */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <svg width="200" height="40" viewBox="0 0 200 40" fill="none">
              <path d="M10 10 Q50 30 100 10 Q150 -10 190 10" stroke="#c9a96e" strokeWidth="1" fill="none" opacity="0.4"/>
              <path d="M10 15 Q50 35 100 15 Q150 -5 190 15" stroke="#c9a96e" strokeWidth="0.5" fill="none" opacity="0.3"/>
              <circle cx="100" cy="10" r="3" fill="#c9a96e" opacity="0.5"/>
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
