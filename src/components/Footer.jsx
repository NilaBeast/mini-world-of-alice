import { motion } from "framer-motion";
import { FaInstagram, FaWhatsapp, FaEnvelope, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <motion.footer className="sticky bottom-0 z-40 bg-black/70 backdrop-blur-xl border-t border-white/20 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-6 grid md:grid-cols-3 gap-6 items-center">
        

        <div className="text-center text-sm">
          © {new Date().getFullYear()} Miniworld of ALICE
        </div>

        <div className="flex justify-center gap-5 text-xl">
          <a href="mailto:manika.basak1977@gmail.com">
            <FaEnvelope />
          </a>
          <a
            href="https://wa.me/918910385772"
            target="_blank"
            rel="noreferrer"
          >
            <FaWhatsapp />
          </a>
          <a
            href="https://instagram.com/your_instagram"
            target="_blank"
            rel="noreferrer"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.youtube.com/@miniworl.of_Alice/featured"
            target="_blank"
            rel="noreferrer"
          >
            <FaYoutube />
          </a>
        </div>
      </div>
    </motion.footer>
  );
}
