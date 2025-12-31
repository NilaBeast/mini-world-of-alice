import { motion, AnimatePresence } from "framer-motion";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import {
  FiMenu,
  FiX,
  FiHome,
  FiBox,
  FiVideo,
  FiInfo,
  FiPhone,
  FiTool,
} from "react-icons/fi";
import logo from "../assets/images/logo-23.jpg";

const navLinks = [
  { label: "Home", path: "/home", icon: FiHome },
  { label: "Products", path: "/products", icon: FiBox },
  { label: "Shorts", path: "/shorts", icon: FiVideo },
  { label: "About", path: "/about", icon: FiInfo },
  { label: "Contact", path: "/contact", icon: FiPhone },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  if (["/login", "/register"].includes(location.pathname)) return null;

  const handleLogout = () => {
    logout();
    navigate("/login");
    setOpen(false);
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 bg-black/70 backdrop-blur-xl
                   px-6 md:px-10 py-4 flex justify-between items-center
                   border-b border-white/20"
      >
        {/* LOGO */}
        <NavLink to="/home" className="flex items-center gap-3">
          <img
            src={logo}
            alt="Mini World of Alice"
            className="w-10 h-10 rounded-full object-cover border border-white/30"
          />
          <h1 className="text-lg md:text-xl font-bold text-white">
            Mini World of Alice
          </h1>
        </NavLink>

        {/* ================= DESKTOP LINKS ================= */}
        <div className="hidden md:flex gap-8 text-white font-medium items-center relative">
          {navLinks.map(({ label, path, icon: Icon }) => (
            <NavLink key={label} to={path} className="relative group">
              {({ isActive }) => (
                <motion.span
                  whileHover={{ scale: 1.08 }}
                  className={`flex items-center gap-2 transition-all duration-300 ${
                    isActive
                      ? "text-primary"
                      : "text-white group-hover:text-primary/80"
                  }`}
                >
                  <Icon
                    className={`text-lg transition-all duration-300 ${
                      isActive
                        ? "drop-shadow-[0_0_6px_theme(colors.primary)]"
                        : "opacity-70 group-hover:opacity-100"
                    }`}
                  />

                  {label}

                  {isActive && (
                    <motion.span
                      layoutId="navUnderline"
                      className="absolute -bottom-2 left-0 right-0 h-[3px]
                                 rounded-full bg-primary"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}
                </motion.span>
              )}
            </NavLink>
          ))}

          {/* ================= ADMIN LINK (FIXED & ANIMATED) ================= */}
          {user?.role === "admin" && (
            <NavLink to="/admin" className="relative group">
              {({ isActive }) => (
                <motion.span
                  whileHover={{ scale: 1.08 }}
                  className={`flex items-center gap-2 transition-all duration-300 ${
                    isActive
                      ? "text-primary"
                      : "text-white group-hover:text-primary/80"
                  }`}
                >
                  <FiTool
                    className={`text-lg transition-all duration-300 ${
                      isActive
                        ? "drop-shadow-[0_0_6px_theme(colors.primary)]"
                        : "opacity-70 group-hover:opacity-100"
                    }`}
                  />
                  Admin

                  {isActive && (
                    <motion.span
                      layoutId="navUnderline"
                      className="absolute -bottom-2 left-0 right-0 h-[3px]
                                 rounded-full bg-primary"
                    />
                  )}
                </motion.span>
              )}
            </NavLink>
          )}

          <button
            onClick={handleLogout}
            className="text-rose-400 hover:text-rose-500 transition"
          >
            Logout
          </button>
        </div>

        {/* ================= MOBILE MENU BUTTON ================= */}
        <button
          onClick={() => setOpen(true)}
          className="md:hidden text-white text-2xl"
        >
          <FiMenu />
        </button>
      </motion.nav>

      {/* ================= MOBILE DRAWER ================= */}
      <AnimatePresence>
        {open && (
          <>
            {/* BACKDROP */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-black/60"
            />

            {/* DRAWER */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 z-50 w-72 h-full
                         bg-black/90 backdrop-blur-xl
                         border-l border-white/20 p-6 flex flex-col"
            >
              {/* HEADER */}
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-white font-bold text-lg">Menu</h2>
                <button
                  onClick={() => setOpen(false)}
                  className="text-white text-2xl"
                >
                  <FiX />
                </button>
              </div>

              {/* LINKS */}
              <div className="flex flex-col gap-6 text-white text-lg">
                {navLinks.map(({ label, path, icon: Icon }) => (
                  <NavLink
                    key={label}
                    to={path}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 transition-all duration-300 ${
                        isActive
                          ? "text-primary font-semibold"
                          : "hover:text-primary/80"
                      }`
                    }
                  >
                    <Icon className="text-xl" />
                    {label}
                  </NavLink>
                ))}

                {user?.role === "admin" && (
                  <NavLink
                    to="/admin"
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 transition-all duration-300 ${
                        isActive
                          ? "text-primary font-semibold"
                          : "hover:text-primary/80"
                      }`
                    }
                  >
                    <FiTool className="text-xl" />
                    Admin
                  </NavLink>
                )}

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 text-rose-400 hover:text-rose-500 mt-6"
                >
                  <FiX />
                  Logout
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
