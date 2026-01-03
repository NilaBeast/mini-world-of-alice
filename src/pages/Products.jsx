import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import api from "../api/api";
import bgImage from "../assets/images/Banner1.avif";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [activeIndex, setActiveIndex] = useState({}); // per-product image index
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    api.get("/api/products").then((res) => setProducts(res.data));
  }, []);

  const getHandlers = (id, images) =>
    useSwipeable({
      onSwipedLeft: () =>
        setActiveIndex((prev) => ({
          ...prev,
          [id]: Math.min((prev[id] || 0) + 1, images.length - 1),
        })),
      onSwipedRight: () =>
        setActiveIndex((prev) => ({
          ...prev,
          [id]: Math.max((prev[id] || 0) - 1, 0),
        })),
      trackMouse: true, // desktop drag
    });

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="absolute inset-0 bg-black/40 backdrop-saturate-150" />

      {/* CONTENT */}
      <main className="relative z-10 flex-1 px-4 sm:px-6 lg:px-10 py-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Our Restorations
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {products.map((p) => {
              const images = p.images?.length
                ? p.images
                : [p.image]; // fallback for old products

              const index = activeIndex[p._id] || 0;

              return (
                <motion.div
                  key={p._id}
                  whileHover={{ y: -6 }}
                  onMouseEnter={() => setHovered(p._id)}
                  onMouseLeave={() => setHovered(null)}
                  className="bg-glass backdrop-blur-xl rounded-2xl 
                             border border-glassBorder shadow-glass 
                             text-white p-5 flex flex-col"
                >
                  {/* IMAGE BOX */}
                  <div
                    {...getHandlers(p._id, images)}
                    className="relative h-44 sm:h-48 lg:h-52 w-full 
                               rounded-xl mb-4 overflow-hidden bg-white/10"
                  >
                    <motion.img
                      key={`${p._id}-${index}`}
                      src={
                        hovered === p._id && images[1]
                          ? images[1] // hover swap (desktop)
                          : images[index] // swipe (mobile)
                      }
                      alt={p.title}
                      className="w-full h-full object-contain"
                      initial={{ opacity: 0.7, scale: 1.03 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.35 }}
                    />

                    {/* IMAGE INDICATOR (DOTS) */}
                    {images.length > 1 && (
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                        {images.map((_, i) => (
                          <span
                            key={i}
                            className={`h-2 w-2 rounded-full ${
                              index === i
                                ? "bg-white"
                                : "bg-white/40"
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* TEXT */}
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  <p className="text-gray-300 text-sm mt-1 line-clamp-3">
                    {p.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
