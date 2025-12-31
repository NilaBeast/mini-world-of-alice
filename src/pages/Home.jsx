import { motion } from "framer-motion";
import bgImage from "../assets/images/Banner1.avif";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <motion.div className="relative z-10 w-full max-w-xl sm:max-w-2xl bg-glass backdrop-blur-xl
             rounded-2xl sm:rounded-3xl p-6 sm:p-10
             text-center border border-glassBorder shadow-glass">
  <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4">
    Restore, Not Reject
  </h1>
  <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
    Giving broken things a second life through love, patience, and craftsmanship.
  </p>
   <Link
              to="/products"
              className="inline-block bg-purple-600 hover:bg-purple-900 text-white px-8 py-3 rounded-full text-lg font-medium transition"
            >
              Explore Products
            </Link>
</motion.div>


    </div>
  );
}
