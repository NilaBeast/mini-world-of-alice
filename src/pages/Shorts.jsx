import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../api/api";
import bgImage from "../assets/images/Banner1.avif";

export default function Shorts() {
  const [shorts, setShorts] = useState([]);

  useEffect(() => {
    api.get("/api/shorts").then((res) => setShorts(res.data));
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      {/* background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="absolute inset-0 bg-black/40 backdrop-saturate-150" />

      {/* CONTENT */}
      <main className="relative z-10 flex-1 p-4 sm:p-6 lg:p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {shorts.map((s) => (
            <div
              key={s._id}
              className="rounded-xl overflow-hidden border border-white/20 shadow-xl"
            >
              <iframe
                className="w-full h-[260px] sm:h-[320px] md:h-[400px]"
                src={`https://www.youtube.com/embed/${s.youtubeId}?mute=1`}
                allow="autoplay"
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
