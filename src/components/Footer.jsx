import { motion } from "framer-motion";
import { FaInstagram, FaWhatsapp, FaEnvelope, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <motion.footer className="z-40 bg-black/45 backdrop-blur-2xl border-t border-white/10 text-white/70">
      <div className="max-w-7xl mx-auto px-6 py-6 grid md:grid-cols-3 gap-6 items-center">
        

        <div className="text-center text-sm">
          © {new Date().getFullYear()} Miniworld of ALICE
        </div>

        <div className="flex justify-center gap-5 text-xl">
          <a href="mailto:manika.basak1977@gmail.com" className="hover:text-white transition">
            <FaEnvelope />
          </a>
          <a
            href="https://wa.me/918910385772"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition"
          >
            <FaWhatsapp />
          </a>
          <a
            href="https://www.instagram.com/miniworld.of.alice"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition"
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.youtube.com/@miniworl.of_Alice/featured"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition"
          >
            <FaYoutube />
          </a>
        </div>
      </div>
    </motion.footer>
  );
}
