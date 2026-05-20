import { useState } from "react";
import { motion } from "framer-motion";
import api from "../../api/api";
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
    <div className="max-w-3xl mx-auto">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="w-full art-card p-6 sm:p-10 text-white"
      >
        <div className="flex items-end justify-between gap-4 flex-wrap">
          <div>
            <div className="art-badge w-fit">
              <span className="h-2 w-2 rounded-full bg-amber-300" />
              Admin
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mt-4">Add Product</h2>
            <p className="text-white/70 mt-2">
              Upload images and write a crafted description.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-4">
          <input
            placeholder="Title"
            className="art-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            placeholder="Description"
            rows="4"
            className="art-textarea"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <div className="art-surface p-4">
            <div className="text-sm font-semibold text-white/90">
              Product images
            </div>
            <div className="text-xs text-white/60 mt-1">
              Add up to 5 images. The first image is used as the cover.
            </div>
            <input
              type="file"
              accept="image/*"
              multiple
              className="mt-3 w-full text-white/80"
              onChange={handleImageChange}
            />
          </div>

          {preview.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {preview.map((src, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-2xl overflow-hidden border border-white/10 bg-white/5"
                >
                  <img
                    src={src}
                    alt={`Preview ${i}`}
                    className="h-28 w-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            className={`w-full ${
              loading ? "art-btn-dark opacity-70 cursor-not-allowed" : "art-btn-primary"
            }`}
          >
            {loading ? "Saving…" : "Add Product"}
          </motion.button>
        </div>
      </motion.form>
    </div>
  );
}
