import { useState } from "react";
import { motion } from "framer-motion";
import api from "../../api/api";
import bgImage from "../../assets/images/Banner1.avif";
import toast from "react-hot-toast";

export default function AddProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!imageFile) {
    toast.error("Please select an image");
    return;
  }

  try {
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", imageFile);

    // 🔥 IMPORTANT: NO HEADERS AT ALL
    await api.post("/api/products", formData);

    toast.success("Product added successfully ✅");

    setTitle("");
    setDescription("");
    setImageFile(null);
    setPreview(null);
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
        className="relative z-10 w-full max-w-lg bg-white/10 backdrop-blur-xl p-8 rounded-2xl border border-white/20 text-white"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Add Product
        </h2>

        <input
          placeholder="Title"
          className="w-full p-3 mb-4 rounded-lg bg-white/80 text-black"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Description"
          rows="3"
          className="w-full p-3 mb-4 rounded-lg bg-white/80 text-black"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        {/* IMAGE FILE INPUT */}
        <input
          type="file"
          accept="image/*"
          className="w-full mb-4"
          onChange={handleImageChange}
          required
        />

        {/* PREVIEW */}
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="h-40 w-full object-cover rounded-lg mb-4"
          />
        )}

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
