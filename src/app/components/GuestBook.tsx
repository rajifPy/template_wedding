import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Heart, Send, MessageCircle } from "lucide-react";

interface Comment {
  id: number;
  name: string;
  message: string;
  time: string;
  avatar: string;
}

const initialComments: Comment[] = [
  {
    id: 1,
    name: "Budi Santoso",
    message: "Selamat menempuh hidup baru! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah. Barakallahu lakuma 🤍",
    time: "2 hari yang lalu",
    avatar: "BS",
  },
  {
    id: 2,
    name: "Rina Maharani",
    message: "Congrats kakak! Semoga rumah tangganya langgeng dan penuh keberkahan. Tidak sabar untuk hadir di hari bahagiamu!",
    time: "3 hari yang lalu",
    avatar: "RM",
  },
  {
    id: 3,
    name: "Dian Pertiwi",
    message: "Barakallah ya akhi wa ukhti. Semoga menjadi pasangan yang saling melengkapi dan bahagia dunia akhirat 💕",
    time: "5 hari yang lalu",
    avatar: "DP",
  },
];

export function GuestBook() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newComment: Comment = {
      id: Date.now(),
      name: name.trim(),
      message: message.trim(),
      time: "Baru saja",
      avatar: name.trim().slice(0, 2).toUpperCase(),
    };

    setComments([newComment, ...comments]);
    setName("");
    setMessage("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const avatarColors = ["#7b3f4e", "#4e5b7b", "#3f7b5b", "#7b6b3f", "#5b3f7b"];

  return (
    <section
      id="komentar"
      ref={ref}
      className="py-24 relative overflow-hidden"
      style={{ background: "#1a0a0e" }}
    >
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, #c9a96e, transparent)" }} />

      <div className="max-w-2xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs tracking-[0.5em] uppercase mb-3" style={{ color: "#c9a96e", fontFamily: "'Lato', sans-serif" }}>
            Buku Tamu
          </p>
          <h2
            className="text-5xl"
            style={{ fontFamily: "'Great Vibes', cursive", color: "#f5e6d0" }}
          >
            Komentar
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-16" style={{ background: "linear-gradient(to right, transparent, #c9a96e)" }} />
            <Heart size={12} style={{ color: "#e8a0a0" }} fill="#e8a0a0" />
            <div className="h-px w-16" style={{ background: "linear-gradient(to left, transparent, #c9a96e)" }} />
          </div>
          <p className="mt-4 text-sm" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#9a8070", fontStyle: "italic" }}>
            Kirimkan ucapan dan doa terbaik untuk kami
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="rounded-2xl p-6 mb-8"
          style={{ background: "rgba(255,248,240,0.04)", border: "1px solid rgba(201,169,110,0.2)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          <div className="flex items-center gap-2 mb-5">
            <MessageCircle size={16} style={{ color: "#c9a96e" }} />
            <h3 className="text-sm tracking-wider" style={{ color: "#c9a96e", fontFamily: "'Lato', sans-serif" }}>
              TULIS UCAPAN
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <label
                className="block text-xs tracking-wider mb-2"
                style={{ color: "#7a6050", fontFamily: "'Lato', sans-serif" }}
              >
                NAMA
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama Anda"
                className="w-full px-4 py-3 rounded-xl outline-none text-sm transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(201,169,110,0.2)",
                  color: "#f5e6d0",
                  fontFamily: "'Lato', sans-serif",
                  caretColor: "#c9a96e",
                }}
                onFocus={(e) => { e.target.style.borderColor = "rgba(201,169,110,0.5)"; }}
                onBlur={(e) => { e.target.style.borderColor = "rgba(201,169,110,0.2)"; }}
              />
            </div>
            <div>
              <label
                className="block text-xs tracking-wider mb-2"
                style={{ color: "#7a6050", fontFamily: "'Lato', sans-serif" }}
              >
                UCAPAN & DOA
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tuliskan ucapan dan doa terbaik untuk pengantin..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl outline-none text-sm resize-none transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(201,169,110,0.2)",
                  color: "#f5e6d0",
                  fontFamily: "'Lato', sans-serif",
                  caretColor: "#c9a96e",
                }}
                onFocus={(e) => { e.target.style.borderColor = "rgba(201,169,110,0.5)"; }}
                onBlur={(e) => { e.target.style.borderColor = "rgba(201,169,110,0.2)"; }}
              />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            {submitted && (
              <motion.p
                className="text-sm"
                style={{ color: "#6db56d", fontFamily: "'Lato', sans-serif" }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
              >
                Ucapan terkirim!
              </motion.p>
            )}
            {!submitted && <div />}
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm tracking-wider transition-all duration-300 hover:opacity-80"
              style={{
                fontFamily: "'Lato', sans-serif",
                background: "linear-gradient(135deg, #c9a96e, #e8d5a3)",
                color: "#1a0a0e",
                border: "none",
              }}
            >
              <Send size={14} />
              Kirim
            </button>
          </div>
        </motion.form>

        {/* Comments list */}
        <div className="space-y-4">
          {comments.map((comment, i) => (
            <motion.div
              key={comment.id}
              className="flex gap-4 rounded-2xl p-5"
              style={{ background: "rgba(255,248,240,0.03)", border: "1px solid rgba(201,169,110,0.12)" }}
              initial={{ opacity: 0, y: 20 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.07, duration: 0.5 }}
            >
              {/* Avatar */}
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-xs"
                style={{
                  background: avatarColors[i % avatarColors.length],
                  color: "#f5e6d0",
                  fontFamily: "'Lato', sans-serif",
                  fontWeight: 700,
                }}
              >
                {comment.avatar}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="text-sm" style={{ fontFamily: "'Lato', sans-serif", color: "#d4c0a5", fontWeight: 400 }}>
                    {comment.name}
                  </h4>
                  <span className="text-xs shrink-0" style={{ fontFamily: "'Lato', sans-serif", color: "#5a4040" }}>
                    {comment.time}
                  </span>
                </div>
                <p className="text-sm leading-relaxed" style={{ fontFamily: "'Lato', sans-serif", color: "#9a8070", fontWeight: 300 }}>
                  {comment.message}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
