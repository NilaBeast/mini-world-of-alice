import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import bgImage from "../../assets/images/Banner1.avif";

export default function Dashboard() {
  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="absolute inset-0 bg-black/70" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 bg-white/10 backdrop-blur-xl p-10 rounded-2xl border border-white/20 text-white w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">
          Admin Dashboard
        </h2>

        <div className="flex flex-col gap-4">
          <Link
            to="/admin/add-product"
            className="bg-green-600 text-center py-3 rounded-lg hover:bg-green-700"
          >
            ➕ Add Product
          </Link>

          <Link
            to="/admin/add-short"
            className="bg-blue-600 text-center py-3 rounded-lg hover:bg-blue-700"
          >
            🎬 Add Short
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
