import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FaWhatsapp,
  FaInstagram,
  FaEnvelope,
  FaPhoneAlt,
  FaYoutube,
} from "react-icons/fa";

export default function Contact() {
  const location = useLocation();

  const [form, setForm] = useState({
    name: "",
    email: "",
    product: "",
    message: "",
  });

  // 🔥 AUTO-FILL PRODUCT FROM NAVIGATION STATE
  useEffect(() => {
    if (location.state?.productName) {
      const productName = location.state.productName;

      setForm((prev) => ({
        ...prev,
        product: productName,
        message: `Hi, I am interested in "${productName}". Please share more details.`,
      }));
    }
  }, [location.state]);

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
      setForm({ name: "", email: "", product: "", message: "" });
    } catch (error) {
      console.error("FORMSPREE ERROR:", error);
      toast.error("Failed to send message ❌");
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="art-card p-6 sm:p-10 grid md:grid-cols-2 gap-8"
      >
        {/* LEFT: Contact Info */}
        <div className="text-white space-y-6">
          <h2 className="text-3xl font-bold">Get in Touch</h2>

          <p className="text-gray-300">
            Have something broken or precious? Let’s restore it together.
          </p>

          <div className="space-y-4 text-lg">
            <p className="flex items-center gap-3">
              <FaPhoneAlt className="text-emerald-300" />
              +91 8910385772
            </p>

            <p className="flex items-center gap-3">
              <FaEnvelope className="text-rose-300" />
              prattyusha1115@gmail.com
            </p>

            <a
              href="https://wa.me/918910385772"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-emerald-300 hover:text-emerald-200 transition"
            >
              <FaWhatsapp />
              Chat on WhatsApp
            </a>

            <a
              href="https://www.instagram.com/miniworld.of.alice"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-rose-300 hover:text-rose-200 transition"
            >
              <FaInstagram />
              Follow on Instagram
            </a>

            <a
              href="https://www.youtube.com/@miniworl.of_Alice/featured"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-amber-300 hover:text-amber-200 transition"
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
            className="art-input"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Your Email"
            className="art-input"
            value={form.email}
            onChange={handleChange}
            required
          />

          {/* 🔥 PRODUCT FIELD */}
          <input
            name="product"
            placeholder="Product Name"
            className="art-input"
            value={form.product}
            onChange={handleChange}
          />

          <textarea
            name="message"
            placeholder="Your Message"
            rows="4"
            className="art-textarea"
            value={form.message}
            onChange={handleChange}
            required
          />

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full art-btn-primary"
          >
            Send Message
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
}
