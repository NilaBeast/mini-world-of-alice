import { useEffect, useState } from "react";
import api from "../api/api";
import ProductCard from "../components/ProductCard";
import { motion } from "framer-motion";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    api
      .get("/api/products")
      .then((res) => {
        if (!alive) return;
        setProducts(Array.isArray(res.data) ? res.data : []);
      })
      .catch(() => {
        if (!alive) return;
        setProducts([]);
      })
      .finally(() => {
        if (!alive) return;
        setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Our Restorations
          </h2>
          <p className="text-white/70 mt-1">
            Hand-finished pieces with a crafted touch.
          </p>
        </div>
        <div className="art-badge">
          <span className="h-2 w-2 rounded-full bg-rose-300" />
          {loading ? "Loading…" : `${products.length} items`}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="art-surface p-5 h-[320px] animate-pulse"
            />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="mt-10 art-surface p-8 text-white/70">
          No products found.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-6">
          {products.map((p, idx) => (
            <motion.div
              key={p._id ?? p.id ?? idx}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut", delay: Math.min(idx * 0.03, 0.3) }}
            >
              <ProductCard product={p} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
