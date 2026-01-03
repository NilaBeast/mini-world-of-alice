import { motion } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { useState } from "react";

export default function ProductCard({ product }) {
  const images = product.images?.length
    ? product.images
    : [product.image];

  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);

  const handlers = useSwipeable({
    onSwipedLeft: () =>
      setIndex((i) => Math.min(i + 1, images.length - 1)),
    onSwipedRight: () =>
      setIndex((i) => Math.max(i - 1, 0)),
    trackMouse: true,
  });

  return (
    <motion.div
      whileHover={{ y: -6 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bg-glass backdrop-blur-xl rounded-2xl 
                 border border-glassBorder shadow-glass 
                 text-white p-5 flex flex-col"
    >
      {/* IMAGE */}
      <div
        {...handlers}
        className="relative h-44 sm:h-48 lg:h-52 w-full 
                   rounded-xl mb-4 overflow-hidden bg-white/10"
      >
        <motion.img
          src={
            hovered && images[1]
              ? images[1]
              : images[index]
          }
          alt={product.title}
          className="w-full h-full object-contain"
          initial={{ opacity: 0.7, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
        />

        {/* DOTS */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((_, i) => (
              <span
                key={i}
                className={`h-2 w-2 rounded-full ${
                  index === i ? "bg-white" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      <h3 className="text-lg font-semibold">{product.title}</h3>
      <p className="text-gray-300 text-sm mt-1 line-clamp-3">
        {product.description}
      </p>
    </motion.div>
  );
}
