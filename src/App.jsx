import { BrowserRouter, Routes, Route, Outlet, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ArtBackground from "./components/ArtBackground";
import ClayShowcase from "./components/ClayShowcase";

import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Shorts from "./pages/Shorts";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/admin/Dashboard";
import AddProduct from "./pages/admin/AddProduct";
import AddShort from "./pages/admin/AddShort";
import { Toaster } from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";

function AppLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      <ArtBackground />
      <Navbar />
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="flex-1 px-4 sm:px-6 lg:px-10 py-8"
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

function AuthLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen grid place-items-center px-4 py-10">
      <ArtBackground />
      <div className="w-full max-w-6xl">
        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 12, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -12, filter: "blur(10px)" }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="w-full flex items-center justify-center"
            >
              <div className="w-full max-w-md">
                <Outlet />
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="hidden md:block">
            <ClayShowcase />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3600,
            className: "art-toast",
            success: { className: "art-toast art-toast-success" },
            error: { className: "art-toast art-toast-error" },
          }}
        />

        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route element={<AppLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/shorts" element={<Shorts />} />
            <Route path="/contact" element={<Contact />} />

            <Route
              path="/admin"
              element={
                <ProtectedRoute admin>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/add-product"
              element={
                <ProtectedRoute admin>
                  <AddProduct />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/add-short"
              element={
                <ProtectedRoute admin>
                  <AddShort />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
