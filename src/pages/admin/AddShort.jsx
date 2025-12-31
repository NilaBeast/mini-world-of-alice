import { useState } from "react";
import { motion } from "framer-motion";
import api from "../../api/api";
import bgImage from "../../assets/images/Banner1.avif";
import toast from "react-hot-toast";

export default function AddShort() {
  const [youtubeLink, setYoutubeLink] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔥 Extract YouTube video ID from any valid link
  const extractYoutubeId = (url) => {
    try {
      const regex =
        /(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
      const match = url.match(regex);
      return match ? match[1] : null;
    } catch {
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const youtubeId = extractYoutubeId(youtubeLink);

    if (!youtubeId) {
      toast.error("Please enter a valid YouTube link ❌");
      return;
    }

    try {
      setLoading(true);
      await api.post("/api/shorts", { youtubeId });
      toast.success("YouTube Short added successfully ✅");
      setYoutubeLink("");
    } catch (error) {
      toast.error("Failed to add short ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="absolute inset-0 bg-black/70" />

      {/* Card */}
      <motion.form
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-white/20 text-white"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Add YouTube Short
        </h2>

        <input
          placeholder="Paste YouTube link here"
          className="w-full p-3 mb-6 rounded-lg bg-white/80 text-black"
          value={youtubeLink}
          onChange={(e) => setYoutubeLink(e.target.value)}
          required
        />

        <motion.button
          whileHover={{ scale: 1.03 }}
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold transition ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Publishing..." : "Publish Short"}
        </motion.button>
      </motion.form>
    </div>
  );
}
