import { useState } from "react";
import { motion } from "framer-motion";
import api from "../../api/api";
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
    <div className="max-w-2xl mx-auto">
      <motion.form
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        onSubmit={handleSubmit}
        className="w-full art-card p-6 sm:p-10 text-white"
      >
        <div className="art-badge w-fit">
          <span className="h-2 w-2 rounded-full bg-sky-300" />
          Admin
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold mt-4">
          Add YouTube Short
        </h2>
        <p className="text-white/70 mt-2">
          Paste a YouTube link. We automatically extract the video ID.
        </p>

        <div className="mt-8 space-y-4">
          <input
            placeholder="Paste YouTube link here"
            className="art-input"
            value={youtubeLink}
            onChange={(e) => setYoutubeLink(e.target.value)}
            required
          />

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            className={`w-full ${
              loading ? "art-btn-dark opacity-70 cursor-not-allowed" : "art-btn-primary"
            }`}
          >
            {loading ? "Publishing…" : "Publish Short"}
          </motion.button>
        </div>
      </motion.form>
    </div>
  );
}
