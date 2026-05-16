import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CoverPage } from "./components/CoverPage";
import { NavBar } from "./components/NavBar";
import { HeroSection } from "./components/HeroSection";
import { OurStory } from "./components/OurStory";
import { WeddingDetails } from "./components/WeddingDetails";
import { Gallery } from "./components/Gallery";
import { MessageFromUs } from "./components/MessageFromUs";
import { GuestBook } from "./components/GuestBook";
import { DigitalWallet } from "./components/DigitalWallet";

export default function App() {
  const [opened, setOpened] = useState(false);

  return (
    <div
      className="min-h-screen"
      style={{ background: "#0f0508" }}
    >
      {/* Cover page */}
      <AnimatePresence>
        {!opened && (
          <motion.div
            key="cover"
            exit={{ opacity: 0, scale: 1.08 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <CoverPage onOpen={() => setOpened(true)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main invitation content */}
      <AnimatePresence>
        {opened && (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <NavBar />
            <HeroSection />
            <OurStory />
            <WeddingDetails />
            <Gallery />
            <MessageFromUs />
            <GuestBook />
            <DigitalWallet />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
