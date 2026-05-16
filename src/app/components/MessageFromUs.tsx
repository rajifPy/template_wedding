import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Heart, Quote } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function MessageFromUs() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="ucapan"
      ref={ref}
      className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0f0508 0%, #1a0a0e 100%)" }}
    >
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, #c9a96e, transparent)" }} />

      {/* Decorative quote marks */}
      <div className="absolute top-20 left-10 opacity-5">
        <Quote size={120} style={{ color: "#c9a96e" }} />
      </div>
      <div className="absolute bottom-20 right-10 opacity-5 rotate-180">
        <Quote size={120} style={{ color: "#c9a96e" }} />
      </div>

      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs tracking-[0.5em] uppercase mb-3" style={{ color: "#c9a96e", fontFamily: "'Lato', sans-serif" }}>
            Dari Hati Kami
          </p>
          <h2
            className="text-5xl"
            style={{ fontFamily: "'Great Vibes', cursive", color: "#f5e6d0" }}
          >
            Ucapan dari Kami
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-16" style={{ background: "linear-gradient(to right, transparent, #c9a96e)" }} />
            <Heart size={12} style={{ color: "#e8a0a0" }} fill="#e8a0a0" />
            <div className="h-px w-16" style={{ background: "linear-gradient(to left, transparent, #c9a96e)" }} />
          </div>
        </motion.div>

        {/* Couple photos + message */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Groom */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, x: -30 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <div className="relative inline-block mb-4">
              <div
                className="w-36 h-36 rounded-full overflow-hidden mx-auto"
                style={{ border: "3px solid rgba(201,169,110,0.5)", padding: "3px" }}
              >
                <div className="w-full h-full rounded-full overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1544717304-14d94551b7dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHx3ZWRkaW5nJTIwY291cGxlJTIwcm9tYW50aWMlMjBlbGVnYW50fGVufDF8fHx8MTc3ODk0ODQ3M3ww&ixlib=rb-4.1.0&q=80&w=200"
                    alt="Groom"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div
                className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #c9a96e, #e8d5a3)" }}
              >
                <Heart size={12} fill="white" style={{ color: "white" }} />
              </div>
            </div>
            <h3
              className="text-2xl mb-1"
              style={{ fontFamily: "'Great Vibes', cursive", color: "#f5e6d0" }}
            >
              Reza Pratama
            </h3>
            <p className="text-xs tracking-wider mb-3" style={{ color: "#7a6050", fontFamily: "'Lato', sans-serif" }}>
              Putra dari Bapak Ahmad & Ibu Sri
            </p>
          </motion.div>

          {/* Bride */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, x: 30 }}
            animate={visible ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.7 }}
          >
            <div className="relative inline-block mb-4">
              <div
                className="w-36 h-36 rounded-full overflow-hidden mx-auto"
                style={{ border: "3px solid rgba(201,169,110,0.5)", padding: "3px" }}
              >
                <div className="w-full h-full rounded-full overflow-hidden">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1529636798458-92182e662485?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWRkaW5nJTIwZmxvd2VycyUyMGZsb3JhbCUyMGRlY29yYXRpb258ZW58MXx8fHwxNzc4OTQ4NDc0fDA&ixlib=rb-4.1.0&q=80&w=200"
                    alt="Bride"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div
                className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #c9a96e, #e8d5a3)" }}
              >
                <Heart size={12} fill="white" style={{ color: "white" }} />
              </div>
            </div>
            <h3
              className="text-2xl mb-1"
              style={{ fontFamily: "'Great Vibes', cursive", color: "#f5e6d0" }}
            >
              Salsabila Putri
            </h3>
            <p className="text-xs tracking-wider mb-3" style={{ color: "#7a6050", fontFamily: "'Lato', sans-serif" }}>
              Putri dari Bapak Hendra & Ibu Dewi
            </p>
          </motion.div>
        </div>

        {/* Main message */}
        <motion.div
          className="rounded-2xl p-8 text-center"
          style={{ background: "rgba(201,169,110,0.05)", border: "1px solid rgba(201,169,110,0.2)" }}
          initial={{ opacity: 0, y: 30 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          <p
            className="text-lg leading-loose mb-6"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "#d4c0a5", fontStyle: "italic" }}
          >
            Dengan penuh rasa syukur dan kebahagiaan, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dan turut merayakan momen sakral pernikahan kami.
          </p>
          <p
            className="text-base leading-relaxed mb-6"
            style={{ fontFamily: "'Lato', sans-serif", color: "#9a8070", fontWeight: 300, lineHeight: 1.9 }}
          >
            Kehadiran dan doa restu Anda adalah hadiah terindah bagi kami. Semoga pernikahan kami menjadi berkah dan menghadirkan kebahagiaan yang abadi. Kami berharap dapat berbagi momen bahagia ini bersama orang-orang tercinta.
          </p>
          <div className="flex items-center justify-center gap-2">
            <div className="h-px w-10" style={{ background: "#c9a96e", opacity: 0.4 }} />
            <p
              className="text-2xl"
              style={{ fontFamily: "'Great Vibes', cursive", color: "#c9a96e" }}
            >
              Reza & Salsabila
            </p>
            <div className="h-px w-10" style={{ background: "#c9a96e", opacity: 0.4 }} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
