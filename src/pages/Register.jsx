import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await register(
      formData.name,
      formData.email,
      formData.password
    );
    if (success) navigate("/");
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      onSubmit={handleSubmit}
      className="w-full max-w-md art-card p-6 sm:p-8"
    >
      <div className="text-center">
        <div className="art-badge mx-auto w-fit">
          <span className="h-2 w-2 rounded-full bg-rose-300" />
          Create account
        </div>
        <h2 className="text-3xl font-bold mt-4">Join Miniworld of ALICE</h2>
        <p className="text-white/70 mt-2">A crafted space for restorations</p>
      </div>

      <div className="mt-7 space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          className="art-input"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="art-input"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="art-input"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full art-btn-primary"
        >
          Create Account
        </motion.button>
      </div>

      <p className="mt-6 text-sm text-center text-white/70">
        Already have an account?{" "}
        <Link to="/login" className="text-amber-200 hover:text-amber-100 transition">
          Login
        </Link>
      </p>
    </motion.form>
  );
}
