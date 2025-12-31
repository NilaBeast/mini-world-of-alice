import { motion } from "framer-motion";

export default function AnimatedCard({ children, className = "" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.04 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true }}
      className={`bg-glass backdrop-blur-xl rounded-2xl p-6 shadow-glass border border-glassBorder ${className}`}
    >
      {children}
    </motion.div>
  );
}
