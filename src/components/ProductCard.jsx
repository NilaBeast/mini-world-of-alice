import { motion } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const rawImages = Array.isArray(product?.images)
    ? product.images
    : typeof product?.images === "string"
      ? (() => {
          try {
            const parsed = JSON.parse(product.images);
            return Array.isArray(parsed) ? parsed : [];
          } catch {
            return [];
          }
        })()
      : typeof product?.image === "string"
        ? [product.image]
        : [];

  const images = rawImages
    .map((x) => (typeof x === "string" ? x.trim() : ""))
    .filter((x) => x.length > 0);

  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [failed, setFailed] = useState(() => new Set());
  const navigate = useNavigate();

  const displayIndex =
    hovered && images[1] && !failed.has(1) ? 1 : Math.min(index, Math.max(images.length - 1, 0));
  const displaySrc = images[displayIndex];

  const markFailedAndAdvance = (i) => {
    setFailed((prev) => new Set([...prev, i]));
    setIndex((prev) => {
      for (let step = 1; step <= images.length; step += 1) {
        const next = Math.min(prev + step, images.length - 1);
        if (!failed.has(next) && next !== i) return next;
      }
      return prev;
    });
  };

  const handlers = useSwipeable({
    onSwipedLeft: () =>
      setIndex((i) => Math.min(i + 1, images.length - 1)),
    onSwipedRight: () =>
      setIndex((i) => Math.max(i - 1, 0)),
    trackMouse: true,
  });

  return (
    <motion.div
      whileHover={{ y: -8, rotate: -0.15 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="art-surface text-white p-5 flex flex-col"
    >
      {/* IMAGE */}
      <div
        {...handlers}
        className="relative h-44 sm:h-48 lg:h-52 w-full rounded-2xl mb-4 overflow-hidden bg-white/5 border border-white/10"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10" />
        {images.length > 0 ? (
          <motion.img
            src={displaySrc}
            alt={product.title}
            className="relative w-full h-full object-cover"
            initial={{ opacity: 0.75, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.38, ease: "easeOut" }}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            onError={() => markFailedAndAdvance(displayIndex)}
          />
        ) : (
          <div className="relative h-full w-full grid place-items-center text-white/55 text-sm">
            No image
          </div>
        )}

        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.slice(0, 5).map((_, i) => (
              <div
                key={i}
                className={`h-1.5 w-1.5 rounded-full transition ${
                  i === index ? "bg-amber-200" : "bg-white/25"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* TEXT */}
      <h3 className="text-lg font-semibold tracking-tight">{product.title}</h3>
      <p className="text-white/70 text-sm mt-1 line-clamp-3">
        {product.description}
      </p>

      {/* BUY BUTTON */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() =>
          navigate("/contact", {
            state: { productName: product.title },
          })
        }
        className="mt-4 art-btn-primary"
      >
        Enquire Now
      </motion.button>
    </motion.div>
  );
}
