import { motion } from "framer-motion";

export default function ClayShowcase() {
  const particles = [
    { left: "12%", top: "64%", size: 6, delay: 0.0, dur: 6.8, c: "rgba(251,191,36,0.55)" },
    { left: "22%", top: "78%", size: 4, delay: 0.7, dur: 7.6, c: "rgba(244,114,182,0.55)" },
    { left: "34%", top: "58%", size: 5, delay: 1.2, dur: 8.2, c: "rgba(125,211,252,0.55)" },
    { left: "46%", top: "74%", size: 4, delay: 0.3, dur: 7.1, c: "rgba(214,255,203,0.55)" },
    { left: "58%", top: "66%", size: 5, delay: 1.7, dur: 8.6, c: "rgba(251,191,36,0.45)" },
    { left: "70%", top: "78%", size: 4, delay: 0.9, dur: 7.9, c: "rgba(244,114,182,0.5)" },
    { left: "80%", top: "62%", size: 6, delay: 1.1, dur: 9.1, c: "rgba(125,211,252,0.45)" },
    { left: "16%", top: "40%", size: 4, delay: 0.2, dur: 7.4, c: "rgba(214,255,203,0.45)" },
    { left: "28%", top: "30%", size: 6, delay: 1.4, dur: 9.3, c: "rgba(251,191,36,0.35)" },
    { left: "40%", top: "44%", size: 4, delay: 0.6, dur: 7.0, c: "rgba(244,114,182,0.38)" },
    { left: "62%", top: "34%", size: 5, delay: 1.8, dur: 8.9, c: "rgba(125,211,252,0.35)" },
    { left: "74%", top: "46%", size: 4, delay: 0.4, dur: 7.7, c: "rgba(214,255,203,0.35)" },
  ];

  return (
    <div aria-hidden className="relative h-full min-h-[520px] clay-panel overflow-hidden">
      <div className="absolute inset-0 clay-grid" />
      <div className="absolute inset-0 clay-vignette" />
      <div className="absolute inset-0 clay-sheen" />

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <div className="absolute -top-20 left-10 h-72 w-72 clay-blob clay-blob-a" />
        <div className="absolute top-24 right-4 h-80 w-80 clay-blob clay-blob-b" />
        <div className="absolute -bottom-28 left-24 h-96 w-96 clay-blob clay-blob-c" />
      </motion.div>

      <div className="absolute right-10 top-12 h-16 w-16 clay-cutout clay-cutout-a" />
      <div className="absolute right-16 top-44 h-10 w-10 clay-cutout clay-cutout-b" />
      <div className="absolute right-8 bottom-24 h-14 w-14 clay-cutout clay-cutout-c" />

      <div className="absolute inset-x-0 top-0 h-28 clay-drip-header">
        <div className="clay-drip clay-drip-1" />
        <div className="clay-drip clay-drip-2" />
        <div className="clay-drip clay-drip-3" />
        <div className="clay-drip clay-drip-4" />
        <div className="clay-drip clay-drip-5" />
      </div>

      <svg
        className="absolute inset-0 w-full h-full clay-stroke"
        viewBox="0 0 800 520"
        preserveAspectRatio="none"
      >
        <path
          d="M 70 420 C 170 330, 260 470, 340 400 C 430 320, 520 430, 610 360 C 690 300, 740 330, 770 260"
          fill="none"
          stroke="rgba(255,255,255,0.16)"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <path
          d="M 70 420 C 170 330, 260 470, 340 400 C 430 320, 520 430, 610 360 C 690 300, 740 330, 770 260"
          fill="none"
          stroke="rgba(251,191,36,0.26)"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </svg>

      {particles.map((p, idx) => (
        <motion.div
          key={idx}
          className="absolute rounded-full clay-particle"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background: p.c,
          }}
          animate={{ y: [-4, -22], opacity: [0.0, 0.9, 0.0] }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  );
}
