import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

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

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* AUTH ROUTES (NO NAVBAR / FOOTER) */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* APP ROUTES (WITH NAVBAR + FOOTER) */}
          <Route
            path="/*"
            element={
              <>
                <Navbar />
                <Routes>
                  <Route path="home" element={<Home />} />
                  <Route path="about" element={<About />} />
                  <Route path="products" element={<Products />} />
                  <Route path="shorts" element={<Shorts />} />
                  <Route path="contact" element={<Contact />} />

                  <Route
                    path="admin"
                    element={
                      <ProtectedRoute admin>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="admin/add-product"
                    element={
                      <ProtectedRoute admin>
                        <AddProduct />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="admin/add-short"
                    element={
                      <ProtectedRoute admin>
                        <AddShort />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
                <Footer />
              </>
            }
          />
        </Routes>

        <Toaster position="top-right" />
      </BrowserRouter>
    </AuthProvider>
  );
}
