import { useState } from "react";
import { motion } from "framer-motion";
import bgImage from "../assets/images/Banner1.avif";
import toast from "react-hot-toast";
import {
  FaWhatsapp,
  FaInstagram,
  FaEnvelope,
  FaPhoneAlt,
  FaYoutube,
} from "react-icons/fa";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://formspree.io/f/mgovvzng", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Formspree error");
      }

      toast.success("Message sent successfully ✅");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("FORMSPREE ERROR:", error);
      toast.error("Failed to send message ❌");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="absolute inset-0 bg-black/70" />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-5xl bg-glass backdrop-blur-xl rounded-3xl
                   border border-glassBorder shadow-glass p-10 grid md:grid-cols-2 gap-10"
      >
        {/* LEFT: Contact Info */}
        <div className="text-white space-y-6">
          <h2 className="text-3xl font-bold">Get in Touch 💬</h2>

          <p className="text-gray-300">
            Have something broken or precious? Let’s restore it together.
          </p>

          <div className="space-y-4 text-lg">
            <p className="flex items-center gap-3">
              <FaPhoneAlt className="text-green-400" />
              +91 8910385772
            </p>

            <p className="flex items-center gap-3">
              <FaEnvelope className="text-red-400" />
              prattyusha1115@gmail.com
            </p>

            <a
              href="https://wa.me/918910385772"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-green-400 hover:underline"
            >
              <FaWhatsapp />
              Chat on WhatsApp
            </a>

            <a
              href="https://www.instagram.com/miniworld.of.alice"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-pink-400 hover:underline"
            >
              <FaInstagram />
              Follow on Instagram
            </a>
            <a
              href="https://www.youtube.com/@miniworl.of_Alice/featured"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-red-400 hover:underline"
            >
              <FaYoutube />
              Follow my Youtube Channel
            </a>
          </div>
        </div>

        {/* RIGHT: Contact Form */}
        <motion.form
          onSubmit={submit}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <input
            name="name"
            placeholder="Your Name"
            className="w-full p-3 rounded-lg bg-white/80 focus:outline-none"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Your Email"
            className="w-full p-3 rounded-lg bg-white/80 focus:outline-none"
            value={form.email}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows="4"
            className="w-full p-3 rounded-lg bg-white/80 focus:outline-none"
            value={form.message}
            onChange={handleChange}
            required
          />

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full bg-green-600 hover:bg-green-700
                       text-white py-3 rounded-lg font-semibold transition"
          >
            Send Message
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
}
