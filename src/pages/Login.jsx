import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import bgImage from "../assets/images/Banner1.avif";
export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(formData.email, formData.password);
    if (success) navigate("/home");
  };
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      />
      <div className="absolute inset-0 bg-black/70" />

      {/* Card */}
      <motion.form
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        onSubmit={handleSubmit}
        className="w-full max-w-sm sm:max-w-md bg-glass backdrop-blur-xl
           rounded-2xl p-6 sm:p-8 shadow-xl"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-center">
          Welcome To Mini World of Alice👋
        </h2>
        <p className="text-gray-300 text-center mb-6">
          Login to continue
        </p>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-3 mb-4 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-3 mb-6 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Login
        </motion.button>

        <p className="mt-6 text-sm text-center text-gray-300">
          Don’t have an account?{" "}
          <Link to="/register" className="text-green-400 hover:underline">
            Register
          </Link>
        </p>
      </motion.form>
    </div>
  );
}
