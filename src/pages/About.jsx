import { motion } from "framer-motion";
import bgImage from "../assets/images/Banner1.avif";
import bgImage1 from "../assets/images/logo-23.jpg"

export default function About() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="absolute inset-0 bg-black/75" />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 max-w-4xl bg-glass backdrop-blur-xl p-12 rounded-3xl border border-glassBorder shadow-glass text-white"
      >
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img
            src={bgImage1}
            alt="Mini World of Alice"
            className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36
             rounded-full object-cover border-4 border-primary shadow-glass"
          />
        </div>

        {/* Content */}
        <h2  className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">
          About Mini World of Alice
        </h2>

        <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed text-center max-w-2xl mx-auto">
          <span className="text-white font-semibold">
            Mini World of Alice
          </span>{" "}
          is a handcrafted restoration studio where broken memories find
          a second life. We believe that every object carries a story,
          emotion, and soul — and restoring them is an act of love, not
          replacement.
        </p>

        <p className="mt-6 text-gray-400 text-center leading-relaxed max-w-2xl mx-auto">
          Through patience, craftsmanship, and creativity, we bring damaged
          treasures back to beauty — preserving emotions, not just objects.
        </p>
      </motion.div>
    </div>
  );
}
