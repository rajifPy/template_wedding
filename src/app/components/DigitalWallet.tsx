import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Copy, Check, Gift, ExternalLink } from "lucide-react";

interface WalletItem {
  id: string;
  name: string;
  logo: string;
  number: string;
  holder: string;
  color: string;
  bg: string;
}

const wallets: WalletItem[] = [
  {
    id: "bca",
    name: "Bank BCA",
    logo: "🏦",
    number: "1234567890",
    holder: "REZA PRATAMA",
    color: "#005FCC",
    bg: "rgba(0,95,204,0.1)",
  },
  {
    id: "gopay",
    name: "GoPay",
    logo: "💚",
    number: "0812-3456-7890",
    holder: "REZA PRATAMA",
    color: "#00AED6",
    bg: "rgba(0,174,214,0.1)",
  },
  {
    id: "dana",
    name: "DANA",
    logo: "💙",
    number: "0812-3456-7890",
    holder: "SALSABILA PUTRI",
    color: "#118EEA",
    bg: "rgba(17,142,234,0.1)",
  },
];

function WalletCard({ wallet, index, visible }: { wallet: WalletItem; index: number; visible: boolean }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(wallet.number.replace(/-/g, "")).catch(() => {
      const el = document.createElement("textarea");
      el.value = wallet.number;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    });
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      className="rounded-2xl p-6 relative overflow-hidden"
      style={{ background: "rgba(255,248,240,0.04)", border: `1px solid ${wallet.color}30` }}
      initial={{ opacity: 0, y: 20 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
    >
      {/* Background accent */}
      <div
        className="absolute top-0 right-0 w-32 h-32 rounded-full -translate-y-1/2 translate-x-1/2 opacity-10"
        style={{ background: wallet.color }}
      />

      <div className="relative">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">{wallet.logo}</span>
          <div>
            <h3 className="text-sm" style={{ fontFamily: "'Lato', sans-serif", color: "#f5e6d0", fontWeight: 400 }}>
              {wallet.name}
            </h3>
            <p className="text-xs" style={{ fontFamily: "'Lato', sans-serif", color: "#7a6050" }}>
              a.n. {wallet.holder}
            </p>
          </div>
        </div>

        <div
          className="rounded-xl px-4 py-3 flex items-center justify-between"
          style={{ background: wallet.bg, border: `1px solid ${wallet.color}20` }}
        >
          <span
            className="text-base tracking-wider"
            style={{ fontFamily: "'Lato', sans-serif", color: "#d4c0a5" }}
          >
            {wallet.number}
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all duration-200"
            style={{
              background: copied ? "rgba(109,181,109,0.2)" : "rgba(201,169,110,0.15)",
              color: copied ? "#6db56d" : "#c9a96e",
              border: `1px solid ${copied ? "rgba(109,181,109,0.3)" : "rgba(201,169,110,0.3)"}`,
              fontFamily: "'Lato', sans-serif",
            }}
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.span
                  key="check"
                  className="flex items-center gap-1"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Check size={12} />
                  Tersalin
                </motion.span>
              ) : (
                <motion.span
                  key="copy"
                  className="flex items-center gap-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Copy size={12} />
                  Salin
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export function DigitalWallet() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="dompet"
      ref={ref}
      className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #1a0a0e 0%, #0f0508 100%)" }}
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
            Amplop Digital
          </p>
          <h2
            className="text-5xl"
            style={{ fontFamily: "'Great Vibes', cursive", color: "#f5e6d0" }}
          >
            Dompet Digital
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-16" style={{ background: "linear-gradient(to right, transparent, #c9a96e)" }} />
            <Heart size={12} style={{ color: "#e8a0a0" }} fill="#e8a0a0" />
            <div className="h-px w-16" style={{ background: "linear-gradient(to left, transparent, #c9a96e)" }} />
          </div>
          <p
            className="mt-4 text-sm max-w-sm mx-auto leading-relaxed"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "#9a8070", fontStyle: "italic" }}
          >
            Bagi Anda yang ingin memberikan hadiah, kami dengan tulus menerima melalui transfer digital berikut.
          </p>
        </motion.div>

        {/* Gift icon */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={visible ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.1, duration: 0.6, type: "spring" }}
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, rgba(201,169,110,0.2), rgba(232,213,163,0.1))", border: "1px solid rgba(201,169,110,0.3)" }}
          >
            <Gift size={28} style={{ color: "#c9a96e" }} />
          </div>
        </motion.div>

        {/* Wallet cards */}
        <div className="space-y-4 mb-10">
          {wallets.map((w, i) => (
            <WalletCard key={w.id} wallet={w} index={i} visible={visible} />
          ))}
        </div>

        {/* Saweria section */}
        <motion.div
          className="rounded-2xl p-6 text-center"
          style={{
            background: "linear-gradient(135deg, rgba(255,107,53,0.08), rgba(255,140,0,0.06))",
            border: "1px solid rgba(255,107,53,0.25)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          <div className="flex justify-center mb-4">
            <div
              className="px-4 py-2 rounded-xl text-sm tracking-wider"
              style={{
                background: "linear-gradient(135deg, #ff6b35, #ff8c00)",
                fontFamily: "'Lato', sans-serif",
                color: "#fff",
                fontWeight: 700,
                letterSpacing: "0.1em",
              }}
            >
              SAWERIA
            </div>
          </div>

          <h3
            className="text-xl mb-2"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "#f5e6d0", fontWeight: 500 }}
          >
            Support via Saweria
          </h3>
          <p
            className="text-sm mb-5"
            style={{ fontFamily: "'Lato', sans-serif", color: "#9a7070", fontWeight: 300 }}
          >
            Kirim ucapan selamat dan hadiah digital melalui platform Saweria
          </p>

          <div
            className="rounded-xl px-4 py-3 mb-4 flex items-center justify-between"
            style={{ background: "rgba(255,107,53,0.1)", border: "1px solid rgba(255,107,53,0.2)" }}
          >
            <span
              className="text-sm"
              style={{ fontFamily: "'Lato', sans-serif", color: "#d4c0a5" }}
            >
              saweria.co/rezasalsabila
            </span>
          </div>

          <a
            href="https://saweria.co"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm tracking-wider transition-all duration-300 hover:opacity-80"
            style={{
              fontFamily: "'Lato', sans-serif",
              background: "linear-gradient(135deg, #ff6b35, #ff8c00)",
              color: "#fff",
              border: "none",
            }}
          >
            <Gift size={14} />
            Kirim via Saweria
            <ExternalLink size={12} />
          </a>
        </motion.div>

        {/* Thank you note */}
        <motion.div
          className="text-center mt-10"
          initial={{ opacity: 0 }}
          animate={visible ? { opacity: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.7 }}
        >
          <p
            className="text-sm"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "#7a6050", fontStyle: "italic" }}
          >
            "Kehadiran dan doa Anda adalah hadiah terbaik untuk kami"
          </p>
          <p
            className="mt-2 text-lg"
            style={{ fontFamily: "'Great Vibes', cursive", color: "#c9a96e" }}
          >
            Terima Kasih 🤍
          </p>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="mt-16 text-center">
        <div className="h-px w-full mb-8" style={{ background: "linear-gradient(to right, transparent, rgba(201,169,110,0.3), transparent)" }} />
        <p
          className="text-xs tracking-widest"
          style={{ fontFamily: "'Lato', sans-serif", color: "#4a3030" }}
        >
          REZA & SALSABILA • 14 JUNI 2026 • SOLO, JAWA TENGAH
        </p>
        <div className="flex justify-center mt-3">
          <Heart size={14} style={{ color: "#7b3f4e" }} fill="#7b3f4e" />
        </div>
      </div>
    </section>
  );
}
