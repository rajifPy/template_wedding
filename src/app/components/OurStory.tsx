import { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation, AnimatePresence } from "motion/react";
import { Heart } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const stories = [
  {
    year: "2019",
    title: "Pertemuan Pertama",
    desc: "Kami pertama kali bertemu di sebuah seminar kampus. Sebuah tatapan sederhana yang ternyata menjadi awal dari segalanya.",
    img: "https://images.unsplash.com/photo-1562859135-3c009b776595?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHx3ZWRkaW5nJTIwY291cGxlJTIwcm9tYW50aWMlMjBlbGVnYW50fGVufDF8fHx8MTc3ODk0ODQ3M3ww&ixlib=rb-4.1.0&q=80&w=400",
    align: "left",
    color: "#c9a96e",
  },
  {
    year: "2021",
    title: "Jatuh Cinta",
    desc: "Dua tahun bersahabat, kami akhirnya menyadari bahwa persahabatan ini telah tumbuh menjadi sesuatu yang lebih dalam.",
    img: "https://images.unsplash.com/photo-1607357910286-1ff94ac13c24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw1fHx3ZWRkaW5nJTIwY291cGxlJTIwcm9tYW50aWMlMjBlbGVnYW50fGVufDF8fHx8MTc3ODk0ODQ3M3ww&ixlib=rb-4.1.0&q=80&w=400",
    align: "right",
    color: "#e8a0a0",
  },
  {
    year: "2025",
    title: "Lamaran",
    desc: "Di bawah sinar bulan purnama, dengan cincin sederhana namun penuh makna, ia berlutut dan bertanya — dan jawabannya selalu 'Ya'.",
    img: "https://images.unsplash.com/photo-1655901856612-a7f76949fb80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHx3ZWRkaW5nJTIwY291cGxlJTIwcm9tYW50aWMlMjBlbGVnYW50fGVufDF8fHx8MTc3ODk0ODQ3M3ww&ixlib=rb-4.1.0&q=80&w=400",
    align: "left",
    color: "#c9a96e",
  },
  {
    year: "2026",
    title: "Pernikahan",
    desc: "Dan kini, kami siap melangkah ke babak baru kehidupan — bersama, selamanya.",
    img: "https://images.unsplash.com/photo-1544717304-14d94551b7dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHx3ZWRkaW5nJTIwY291cGxlJTIwcm9tYW50aWMlMjBlbGVnYW50fGVufDF8fHx8MTc3ODk0ODQ3M3ww&ixlib=rb-4.1.0&q=80&w=400",
    align: "right",
    color: "#e8a0a0",
  },
];

/* ── Year Badge ── */
function YearBadge({ year, color, visible }: { year: string; color: string; visible: boolean }) {
  return (
    <motion.div
      className="relative flex flex-col items-center z-20"
      initial={{ scale: 0, opacity: 0 }}
      animate={visible ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 22, delay: 0.1 }}
    >
      {/* Outer glow ring */}
      <motion.div
        className="absolute rounded-full"
        style={{ background: color, width: 60, height: 60, top: -10, left: -10 }}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={visible ? { opacity: [0, 0.3, 0], scale: [0.6, 1.4, 1.8] } : {}}
        transition={{ delay: 0.3, duration: 1.2, ease: "easeOut" }}
      />
      {/* Inner dot */}
      <motion.div
        className="w-10 h-10 rounded-full flex items-center justify-center relative"
        style={{
          background: `linear-gradient(135deg, ${color}, #e8d5a3)`,
          boxShadow: `0 0 24px ${color}60`,
        }}
        animate={visible ? { boxShadow: [`0 0 8px ${color}40`, `0 0 32px ${color}80`, `0 0 16px ${color}50`] } : {}}
        transition={{ delay: 0.4, duration: 2, repeat: Infinity, repeatType: "reverse" }}
      >
        <Heart size={14} style={{ color: "#fff" }} fill="#fff" />
      </motion.div>

      {/* Year label */}
      <motion.div
        className="mt-2 px-3 py-1 rounded-full text-xs font-bold tracking-wider"
        style={{
          background: `rgba(${color === "#c9a96e" ? "201,169,110" : "232,160,160"},0.15)`,
          border: `1px solid ${color}40`,
          color: color,
          fontFamily: "'Lato', sans-serif",
        }}
        initial={{ opacity: 0, y: 8 }}
        animate={visible ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.25, duration: 0.5 }}
      >
        {year}
      </motion.div>
    </motion.div>
  );
}

/* ── Timeline Line Progress ── */
function TimelineLineSegment({ visible }: { visible: boolean }) {
  return (
    <div className="hidden md:flex justify-center mt-2 mb-2">
      <div className="relative w-px" style={{ height: 48 }}>
        <div className="absolute inset-0 w-px" style={{ background: "rgba(201,169,110,0.1)" }} />
        <motion.div
          className="absolute top-0 left-0 w-px"
          style={{ background: "linear-gradient(to bottom, #c9a96e, rgba(201,169,110,0.2))", originY: 0 }}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={visible ? { scaleY: 1, opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.7, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

/* ── Story Card ── */
function StoryCard({ story, index }: { story: typeof stories[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px 0px" });
  const controls = useAnimation();

  const isLeft = story.align === "left";

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const cardVariants = {
    hidden: {
      opacity: 0,
      x: isLeft ? -60 : 60,
      y: 20,
      scale: 0.94,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 18,
        delay: 0.35,
      },
    },
  };

  const mobileCardVariants = {
    hidden: { opacity: 0, x: 32, y: 16 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 18,
        delay: 0.3,
      },
    },
  };

  const imageVariants = {
    hidden: { scale: 1.12, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { delay: 0.55, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.65 + i * 0.1, duration: 0.5, ease: "easeOut" },
    }),
  };

  return (
    <div ref={ref} className="mb-2 md:mb-0">

      {/* ── MOBILE ── */}
      <div className="flex md:hidden gap-4 mb-10">
        {/* Left: dot + line */}
        <div className="flex flex-col items-center flex-shrink-0">
          <YearBadge year={story.year} color={story.color} visible={isInView} />
          <motion.div
            className="flex-1 w-px mt-3"
            style={{ background: "rgba(201,169,110,0.2)" }}
            initial={{ scaleY: 0, originY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ delay: 0.7, duration: 0.6, ease: "easeOut" }}
          />
        </div>

        {/* Card */}
        <motion.div
          className="flex-1 pb-4"
          variants={mobileCardVariants}
          initial="hidden"
          animate={controls}
        >
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: "rgba(255,248,240,0.05)",
              border: "1px solid rgba(201,169,110,0.2)",
            }}
          >
            <motion.div className="h-44 overflow-hidden" variants={imageVariants} initial="hidden" animate={controls}>
              <ImageWithFallback
                src={story.img}
                alt={story.title}
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="p-4">
              <motion.h3
                className="text-lg mb-1.5"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: "#f5e6d0", fontWeight: 500 }}
                variants={textVariants}
                custom={0}
                initial="hidden"
                animate={controls}
              >
                {story.title}
              </motion.h3>
              <motion.p
                className="text-sm leading-relaxed"
                style={{ fontFamily: "'Lato', sans-serif", color: "#a09080", fontWeight: 300 }}
                variants={textVariants}
                custom={1}
                initial="hidden"
                animate={controls}
              >
                {story.desc}
              </motion.p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── DESKTOP ── */}
      <div className="hidden md:block relative mb-16">
        {/* Center dot */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 z-20">
          <YearBadge year={story.year} color={story.color} visible={isInView} />
        </div>

        {/* Card positioned left or right */}
        <div className="flex items-start pt-2">
          <div className="w-1/2 flex justify-end pr-16">
            {isLeft && (
              <motion.div
                className="w-[88%]"
                variants={cardVariants}
                initial="hidden"
                animate={controls}
              >
                <StoryCardInner story={story} controls={controls} textVariants={textVariants} imageVariants={imageVariants} />
              </motion.div>
            )}
          </div>
          <div className="w-1/2 flex justify-start pl-16">
            {!isLeft && (
              <motion.div
                className="w-[88%]"
                variants={cardVariants}
                initial="hidden"
                animate={controls}
              >
                <StoryCardInner story={story} controls={controls} textVariants={textVariants} imageVariants={imageVariants} />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StoryCardInner({
  story,
  controls,
  textVariants,
  imageVariants,
}: {
  story: typeof stories[0];
  controls: ReturnType<typeof useAnimation>;
  textVariants: object;
  imageVariants: object;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="rounded-2xl overflow-hidden cursor-default"
      style={{
        background: "rgba(255,248,240,0.05)",
        border: "1px solid rgba(201,169,110,0.2)",
        backdropFilter: "blur(10px)",
        boxShadow: hovered
          ? `0 20px 50px rgba(0,0,0,0.5), 0 0 30px ${story.color}20`
          : "0 4px 20px rgba(0,0,0,0.3)",
        transition: "box-shadow 0.4s ease",
      }}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <motion.div
        className="h-52 overflow-hidden"
        variants={imageVariants}
        initial="hidden"
        animate={controls}
      >
        <motion.div
          className="w-full h-full"
          animate={hovered ? { scale: 1.06 } : { scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <ImageWithFallback
            src={story.img}
            alt={story.title}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Shimmer overlay on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(135deg, transparent 40%, ${story.color}15 60%, transparent 80%)`,
              }}
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: "100%", opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
            />
          )}
        </AnimatePresence>
      </motion.div>

      <div className="p-5">
        <motion.div
          className="w-8 h-0.5 mb-3 rounded-full"
          style={{ background: story.color }}
          variants={{ hidden: { scaleX: 0, originX: 0 }, visible: { scaleX: 1, transition: { delay: 0.6, duration: 0.4 } } }}
          initial="hidden"
          animate={controls}
        />
        <motion.h3
          className="text-xl mb-2"
          style={{ fontFamily: "'Cormorant Garamond', serif", color: "#f5e6d0", fontWeight: 500 }}
          variants={textVariants as Parameters<typeof motion.h3>[0]["variants"]}
          custom={0}
          initial="hidden"
          animate={controls}
        >
          {story.title}
        </motion.h3>
        <motion.p
          className="text-sm leading-relaxed"
          style={{ fontFamily: "'Lato', sans-serif", color: "#a09080", fontWeight: 300 }}
          variants={textVariants as Parameters<typeof motion.p>[0]["variants"]}
          custom={1}
          initial="hidden"
          animate={controls}
        >
          {story.desc}
        </motion.p>
      </div>
    </motion.div>
  );
}

/* ── Section Header ── */
function SectionHeader() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <motion.div
      ref={ref}
      className="text-center mb-16"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <motion.p
        className="text-xs tracking-[0.5em] uppercase mb-3"
        style={{ color: "#c9a96e", fontFamily: "'Lato', sans-serif" }}
        initial={{ opacity: 0, letterSpacing: "0.8em" }}
        animate={isInView ? { opacity: 1, letterSpacing: "0.5em" } : {}}
        transition={{ delay: 0.2, duration: 0.7 }}
      >
        Perjalanan Kami
      </motion.p>

      <motion.h2
        className="text-5xl"
        style={{ fontFamily: "'Great Vibes', cursive", color: "#f5e6d0" }}
        initial={{ opacity: 0, scale: 0.92, y: 12 }}
        animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ delay: 0.3, duration: 0.7, type: "spring", stiffness: 120 }}
      >
        Cerita Kita
      </motion.h2>

      <motion.div
        className="flex items-center justify-center gap-3 mt-4"
        initial={{ opacity: 0, scaleX: 0.4 }}
        animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <div className="h-px w-16" style={{ background: "linear-gradient(to right, transparent, #c9a96e)" }} />
        <motion.div
          animate={isInView ? { scale: [1, 1.3, 1] } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <Heart size={12} style={{ color: "#e8a0a0" }} fill="#e8a0a0" />
        </motion.div>
        <div className="h-px w-16" style={{ background: "linear-gradient(to left, transparent, #c9a96e)" }} />
      </motion.div>

      <motion.p
        className="mt-4 text-sm max-w-md mx-auto leading-relaxed px-4"
        style={{ fontFamily: "'Cormorant Garamond', serif", color: "#9a8070", fontStyle: "italic" }}
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        "Cinta bukan tentang menemukan orang yang sempurna, tetapi tentang melihat orang yang tidak sempurna dengan cara yang sempurna."
      </motion.p>
    </motion.div>
  );
}

/* ── Timeline Vertical Line (desktop) ── */
function TimelineVerticalLine({ visible }: { visible: boolean }) {
  return (
    <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px overflow-hidden">
      <motion.div
        className="w-full"
        style={{
          background: "linear-gradient(to bottom, transparent, #c9a96e 15%, #c9a96e 85%, transparent)",
          height: "100%",
          originY: 0,
        }}
        initial={{ scaleY: 0, opacity: 0 }}
        animate={visible ? { scaleY: 1, opacity: 1 } : {}}
        transition={{ duration: 2, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
      />
      {/* Animated shimmer dot */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full"
        style={{ background: "#c9a96e" }}
        animate={visible ? { top: ["0%", "100%"] } : {}}
        transition={{ delay: 0.8, duration: 3, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }}
      />
    </div>
  );
}

export function OurStory() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });

  return (
    <section
      id="cerita-kita"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
      style={{ background: "#1a0a0e" }}
    >
      {/* Background dot pattern */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.04 } : {}}
        transition={{ duration: 1.2 }}
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage: "radial-gradient(circle, #c9a96e 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </motion.div>

      {/* Ambient glows */}
      <motion.div
        className="absolute top-1/4 left-0 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(201,169,110,0.06) 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-0 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(232,160,160,0.04) 0%, transparent 70%)" }}
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <SectionHeader />

        {/* Timeline */}
        <div className="relative">
          <TimelineVerticalLine visible={isInView} />

          {stories.map((story, i) => (
            <StoryCard key={i} story={story} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
