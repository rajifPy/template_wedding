import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Heart, MapPin, Clock, Calendar, Users } from "lucide-react";

function CountdownTimer() {
  const targetDate = new Date("2026-06-14T09:00:00");
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calc = () => {
      const diff = targetDate.getTime() - Date.now();
      if (diff <= 0) return;
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: "Hari", value: timeLeft.days },
    { label: "Jam", value: timeLeft.hours },
    { label: "Menit", value: timeLeft.minutes },
    { label: "Detik", value: timeLeft.seconds },
  ];

  return (
    <div className="flex justify-center gap-2 sm:gap-4 md:gap-6">
      {units.map((u) => (
        <div key={u.label} className="text-center">
          <div
            className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(201,169,110,0.1)", border: "1px solid rgba(201,169,110,0.3)" }}
          >
            <span
              className="text-xl sm:text-2xl md:text-3xl tabular-nums"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: "#c9a96e", fontWeight: 600 }}
            >
              {String(u.value).padStart(2, "0")}
            </span>
          </div>
          <p className="text-xs mt-1.5 tracking-wider" style={{ color: "#7a6050", fontFamily: "'Lato', sans-serif" }}>
            {u.label}
          </p>
        </div>
      ))}
    </div>
  );
}

function FadeInCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.7 }}
    >
      {children}
    </motion.div>
  );
}

const events = [
  {
    type: "Akad Nikah",
    icon: <Users size={20} style={{ color: "#c9a96e" }} />,
    time: "08.00 – 10.00 WIB",
    date: "Sabtu, 14 Juni 2026",
    venue: "Gedung Graha Saba",
    address: "Jl. Slamet Riyadi No. 274, Solo, Jawa Tengah",
    mapUrl: "https://maps.google.com/?q=Gedung+Graha+Saba+Solo",
  },
  {
    type: "Resepsi Pernikahan",
    icon: <Heart size={20} style={{ color: "#c9a96e" }} fill="#c9a96e" />,
    time: "11.00 – 14.00 WIB",
    date: "Sabtu, 14 Juni 2026",
    venue: "Gedung Graha Saba",
    address: "Jl. Slamet Riyadi No. 274, Solo, Jawa Tengah",
    mapUrl: "https://maps.google.com/?q=Gedung+Graha+Saba+Solo",
  },
];

export function WeddingDetails() {
  return (
    <section
      id="wedding"
      className="py-20 sm:py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #1a0a0e 0%, #0f0508 100%)" }}
    >
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, #c9a96e, transparent)" }} />

      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <FadeInCard>
          <div className="text-center mb-10 sm:mb-12">
            <p className="text-xs tracking-[0.5em] uppercase mb-3" style={{ color: "#c9a96e", fontFamily: "'Lato', sans-serif" }}>
              Menyambut Hari Istimewa
            </p>
            <h2 className="text-5xl" style={{ fontFamily: "'Great Vibes', cursive", color: "#f5e6d0" }}>
              Wedding
            </h2>
            <div className="flex items-center justify-center gap-3 mt-4">
              <div className="h-px w-16" style={{ background: "linear-gradient(to right, transparent, #c9a96e)" }} />
              <Heart size={12} style={{ color: "#e8a0a0" }} fill="#e8a0a0" />
              <div className="h-px w-16" style={{ background: "linear-gradient(to left, transparent, #c9a96e)" }} />
            </div>
          </div>
        </FadeInCard>

        {/* Quranic verse */}
        <FadeInCard delay={0.1}>
          <div
            className="text-center mb-10 sm:mb-12 px-5 sm:px-8 py-6 sm:py-8 rounded-2xl"
            style={{ background: "rgba(201,169,110,0.05)", border: "1px solid rgba(201,169,110,0.15)" }}
          >
            <p
              className="text-base sm:text-lg mb-3"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: "#d4c0a5", fontStyle: "italic", lineHeight: 1.8 }}
            >
              "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya."
            </p>
            <p className="text-xs tracking-wider" style={{ color: "#7a6050", fontFamily: "'Lato', sans-serif" }}>
              QS. Ar-Rum: 21
            </p>
          </div>
        </FadeInCard>

        {/* Countdown */}
        <FadeInCard delay={0.15}>
          <div className="text-center mb-10 sm:mb-12">
            <p className="text-sm mb-5 tracking-wider" style={{ color: "#9a8070", fontFamily: "'Lato', sans-serif", fontWeight: 300 }}>
              Menuju Hari Bahagia
            </p>
            <CountdownTimer />
          </div>
        </FadeInCard>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-8 sm:mb-10">
          <div className="h-px flex-1" style={{ background: "rgba(201,169,110,0.2)" }} />
          <Heart size={14} style={{ color: "#c9a96e" }} fill="#c9a96e" />
          <div className="h-px flex-1" style={{ background: "rgba(201,169,110,0.2)" }} />
        </div>

        {/* Event cards — stacked on mobile, 2-col on md+ */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {events.map((event, i) => (
            <FadeInCard key={i} delay={0.2 + i * 0.1}>
              <div
                className="rounded-2xl p-5 sm:p-6 h-full"
                style={{ background: "rgba(255,248,240,0.04)", border: "1px solid rgba(201,169,110,0.2)" }}
              >
                <div className="flex items-center gap-3 mb-4 sm:mb-5">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(201,169,110,0.1)" }}
                  >
                    {event.icon}
                  </div>
                  <h3
                    className="text-base sm:text-lg"
                    style={{ fontFamily: "'Cormorant Garamond', serif", color: "#f5e6d0", fontWeight: 500 }}
                  >
                    {event.type}
                  </h3>
                </div>

                <div className="space-y-2.5 sm:space-y-3">
                  <div className="flex items-center gap-3">
                    <Calendar size={14} style={{ color: "#c9a96e" }} className="shrink-0" />
                    <span className="text-sm" style={{ fontFamily: "'Lato', sans-serif", color: "#b0a090", fontWeight: 300 }}>
                      {event.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock size={14} style={{ color: "#c9a96e" }} className="shrink-0" />
                    <span className="text-sm" style={{ fontFamily: "'Lato', sans-serif", color: "#b0a090", fontWeight: 300 }}>
                      {event.time}
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin size={14} style={{ color: "#c9a96e" }} className="shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm" style={{ fontFamily: "'Lato', sans-serif", color: "#d4c0a5" }}>
                        {event.venue}
                      </p>
                      <p className="text-xs mt-0.5" style={{ fontFamily: "'Lato', sans-serif", color: "#7a6050" }}>
                        {event.address}
                      </p>
                    </div>
                  </div>
                </div>

                <a
                  href={event.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 sm:mt-5 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs tracking-wider uppercase transition-all duration-300 hover:opacity-80"
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    background: "rgba(201,169,110,0.15)",
                    color: "#c9a96e",
                    border: "1px solid rgba(201,169,110,0.3)",
                  }}
                >
                  <MapPin size={12} />
                  Lihat Lokasi
                </a>
              </div>
            </FadeInCard>
          ))}
        </div>

        {/* Add to calendar */}
        <FadeInCard delay={0.4}>
          <div className="text-center mt-8 sm:mt-10">
            <button
              className="px-6 sm:px-8 py-3 rounded-full text-sm tracking-wider transition-all duration-300 hover:opacity-80"
              style={{
                fontFamily: "'Lato', sans-serif",
                background: "linear-gradient(135deg, #c9a96e, #e8d5a3)",
                color: "#1a0a0e",
                border: "none",
              }}
              onClick={() => {
                const icsContent = [
                  "BEGIN:VCALENDAR",
                  "VERSION:2.0",
                  "BEGIN:VEVENT",
                  "DTSTART:20260614T020000Z",
                  "DTEND:20260614T070000Z",
                  "SUMMARY:Pernikahan Reza & Salsabila",
                  "LOCATION:Gedung Graha Saba, Solo",
                  "END:VEVENT",
                  "END:VCALENDAR",
                ].join("\n");
                const blob = new Blob([icsContent], { type: "text/calendar" });
                const a = document.createElement("a");
                a.href = URL.createObjectURL(blob);
                a.download = "pernikahan-reza-salsabila.ics";
                a.click();
              }}
            >
              Simpan ke Kalender
            </button>
          </div>
        </FadeInCard>
      </div>
    </section>
  );
}
