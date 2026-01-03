import { useState } from "react";
import { motion } from "framer-motion";
import api from "../../api/api";
import bgImage from "../../assets/images/Banner1.avif";
import toast from "react-hot-toast";

export default function AddProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);        // 🔥 multiple files
  const [preview, setPreview] = useState([]);      // 🔥 preview URLs
  const [loading, setLoading] = useState(false);

  // 🔥 HANDLE MULTI IMAGE SELECTION
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    setImages(files);
    setPreview(files.map((file) => URL.createObjectURL(file)));
  };

  // 🔥 SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!images.length) {
      toast.error("Please select at least one image");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);

      // 🔥 append ALL images
      images.forEach((img) => {
        formData.append("images", img);
      });

      // ❗ DO NOT SET HEADERS (axios handles it)
      await api.post("/api/products", formData);

      toast.success("Product added successfully ✅");

      // RESET
      setTitle("");
      setDescription("");
      setImages([]);
      setPreview([]);
    } catch (error) {
      console.error("UPLOAD ERROR:", error);
      toast.error("Failed to add product ❌");
    } finally {
      setLoading(false);
    }
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
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-lg bg-white/10 backdrop-blur-xl 
                   p-8 rounded-2xl border border-white/20 text-white"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Add Product
        </h2>

        {/* TITLE */}
        <input
          placeholder="Title"
          className="w-full p-3 mb-4 rounded-lg bg-white/80 text-black"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {/* DESCRIPTION */}
        <textarea
          placeholder="Description"
          rows="3"
          className="w-full p-3 mb-4 rounded-lg bg-white/80 text-black"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        {/* MULTI IMAGE INPUT */}
        <input
          type="file"
          accept="image/*"
          multiple
          className="w-full mb-4"
          onChange={handleImageChange}
        />

        {/* IMAGE PREVIEW GRID */}
        {preview.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mb-4">
            {preview.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Preview ${i}`}
                className="h-24 w-full object-cover rounded-lg"
              />
            ))}
          </div>
        )}

        {/* SUBMIT */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold transition ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Saving..." : "Add Product"}
        </motion.button>
      </motion.form>
    </div>
  );
}
