import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, Menu, X } from "lucide-react";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#cerita-kita", label: "Cerita Kita" },
  { href: "#wedding", label: "Wedding" },
  { href: "#galeri", label: "Galeri" },
  { href: "#ucapan", label: "Ucapan" },
  { href: "#komentar", label: "Komentar" },
  { href: "#dompet", label: "Dompet Digital" },
];

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 100) {
          setActive(`#${sections[i]}`);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-40 px-6 py-4 flex items-center justify-between transition-all duration-300"
        style={{
          background: scrolled ? "rgba(15,5,8,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(201,169,110,0.15)" : "none",
        }}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {/* Logo */}
        <button
          className="flex items-center gap-2"
          onClick={() => scrollTo("#home")}
        >
          <Heart size={14} style={{ color: "#e8a0a0" }} fill="#e8a0a0" />
          <span
            className="text-lg"
            style={{ fontFamily: "'Great Vibes', cursive", color: "#f5e6d0" }}
          >
            R & S
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="text-xs tracking-wider uppercase transition-colors duration-200 relative"
              style={{
                fontFamily: "'Lato', sans-serif",
                color: active === link.href ? "#c9a96e" : "#7a6050",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              {link.label}
              {active === link.href && (
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-px"
                  style={{ background: "#c9a96e" }}
                  layoutId="nav-underline"
                />
              )}
            </button>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
          style={{ color: "#c9a96e", background: "none", border: "none", cursor: "pointer" }}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </motion.nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-30 flex flex-col pt-20"
            style={{ background: "rgba(10,4,6,0.98)", backdropFilter: "blur(12px)" }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="flex flex-col items-center gap-6 pt-8">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-sm tracking-[0.3em] uppercase"
                  style={{
                    fontFamily: "'Lato', sans-serif",
                    color: active === link.href ? "#c9a96e" : "#7a6050",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {link.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
