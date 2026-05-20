import { motion } from "framer-motion";
import bgImage1 from "../assets/images/logo-23.jpg"

export default function About() {
  return (
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="art-card p-7 sm:p-10 md:p-12"
      >
        <div className="flex flex-col items-center text-center gap-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative"
          >
            <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-amber-300/25 via-rose-300/20 to-sky-300/25 blur-xl" />
            <img
              src={bgImage1}
              alt="Miniworld of Alice"
              className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border border-white/20"
            />
          </motion.div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            About Miniworld of ALICE
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-white/80 leading-relaxed max-w-2xl">
            <span className="text-white font-semibold">Miniworld of ALICE</span>{" "}
            is a handcrafted restoration studio where broken memories find a second
            life. Every object carries a story — and restoring it is an act of love,
            not replacement.
          </p>

          <p className="text-white/70 leading-relaxed max-w-2xl">
            With patience, craftsmanship, and creativity, we bring damaged treasures
            back to beauty — preserving emotions, not just objects.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
