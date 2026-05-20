import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
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
    <motion.form
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      onSubmit={handleSubmit}
      className="w-full max-w-sm sm:max-w-md art-card p-6 sm:p-8"
    >
      <div className="text-center">
        <div className="art-badge mx-auto w-fit">
          <span className="h-2 w-2 rounded-full bg-amber-300" />
          Miniworld of ALICE
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold mt-4">Welcome back</h2>
        <p className="text-white/70 mt-2">Login to continue</p>
      </div>

      <div className="mt-7 space-y-4">
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
          Login
        </motion.button>
      </div>

      <p className="mt-6 text-sm text-center text-white/70">
        Don’t have an account?{" "}
        <Link to="/register" className="text-amber-200 hover:text-amber-100 transition">
          Register
        </Link>
      </p>
    </motion.form>
  );
}
