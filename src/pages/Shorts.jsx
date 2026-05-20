import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../api/api";

export default function Shorts() {
  const [shorts, setShorts] = useState([]);

  useEffect(() => {
    api.get("/api/shorts").then((res) => setShorts(res.data));
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Shorts</h2>
          <p className="text-white/70 mt-1">
            Quick process videos and craft moments.
          </p>
        </div>
        <div className="art-badge">
          <span className="h-2 w-2 rounded-full bg-sky-300" />
          {shorts.length} videos
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mt-6">
        {shorts.map((s, idx) => (
          <motion.div
            key={s._id ?? s.id ?? idx}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            whileHover={{ y: -6 }}
            className="art-surface overflow-hidden"
          >
            <div className="px-5 pt-5">
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-semibold text-white/90 truncate">
                  {s.title || "Craft short"}
                </div>
                <div className="text-xs text-white/60">YouTube</div>
              </div>
            </div>
            <div className="p-5 pt-4">
              <div className="rounded-xl overflow-hidden border border-white/10">
                <iframe
                  className="w-full h-[260px] sm:h-[320px] md:h-[400px]"
                  src={`https://www.youtube.com/embed/${s.youtubeId}?mute=1`}
                  allow="autoplay"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
