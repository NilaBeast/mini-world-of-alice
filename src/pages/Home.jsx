import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto">
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="art-card p-7 sm:p-10 md:p-12 overflow-hidden"
      >
        <div className="flex flex-col items-center text-center gap-6">
          <div className="art-badge">
            <span className="h-2 w-2 rounded-full bg-amber-300" />
            Arts • Crafts • Restoration
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Restore, Not Reject
          </h1>

          <p className="text-white/80 text-base sm:text-lg leading-relaxed max-w-2xl">
            Giving broken things a second life through patience, storytelling, and
            craftsmanship.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/products" className="art-btn-primary">
              Explore Products
            </Link>
            <Link to="/shorts" className="art-btn-dark">
              Watch Shorts
            </Link>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.08 }}
        className="grid md:grid-cols-3 gap-4 mt-6"
      >
        {[
          { t: "Repair with care", d: "Fine details, clean joins, durable finishes." },
          { t: "Art-first approach", d: "Color, texture, and charm that feels handmade." },
          { t: "Made for stories", d: "Preserve memories instead of replacing them." },
        ].map((card) => (
          <motion.div
            key={card.t}
            whileHover={{ y: -6, rotate: -0.2 }}
            className="art-surface p-6"
          >
            <h3 className="text-lg font-semibold text-white">{card.t}</h3>
            <p className="text-sm text-white/70 mt-2">{card.d}</p>
          </motion.div>
        ))}
      </motion.section>
    </div>
  );
}
