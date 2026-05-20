import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../api/api";

function formatDate(value) {
  if (!value) return "";
  try {
    return new Date(value).toLocaleString();
  } catch {
    return "";
  }
}

export default function Dashboard() {
  const [tab, setTab] = useState("products");
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [shorts, setShorts] = useState([]);

  const [editProduct, setEditProduct] = useState(null);
  const [editShort, setEditShort] = useState(null);
  const [saving, setSaving] = useState(false);

  const refresh = async () => {
    setLoading(true);
    try {
      const [pRes, sRes] = await Promise.all([
        api.get("/api/products"),
        api.get("/api/shorts"),
      ]);
      setProducts(pRes.data);
      setShorts(sRes.data);
    } catch (e) {
      toast.error("Failed to load admin data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const stats = useMemo(
    () => ({ products: products.length, shorts: shorts.length }),
    [products.length, shorts.length]
  );

  const deleteProduct = async (id) => {
    const ok = window.confirm("Delete this product?");
    if (!ok) return;
    try {
      await api.delete(`/api/products/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast.success("Product deleted");
    } catch {
      toast.error("Failed to delete product");
    }
  };

  const deleteShort = async (id) => {
    const ok = window.confirm("Delete this short?");
    if (!ok) return;
    try {
      await api.delete(`/api/shorts/${id}`);
      setShorts((prev) => prev.filter((s) => s.id !== id));
      toast.success("Short deleted");
    } catch {
      toast.error("Failed to delete short");
    }
  };

  const saveProduct = async (e) => {
    e.preventDefault();
    if (!editProduct) return;

    try {
      setSaving(true);
      const files = editProduct.newImages || [];

      let updated;
      if (files.length > 0) {
        const fd = new FormData();
        fd.append("title", editProduct.title || "");
        fd.append("description", editProduct.description || "");
        files.forEach((f) => fd.append("images", f));
        const res = await api.put(`/api/products/${editProduct.id}`, fd);
        updated = res.data;
      } else {
        const res = await api.put(`/api/products/${editProduct.id}`, {
          title: editProduct.title,
          description: editProduct.description,
        });
        updated = res.data;
      }

      setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
      toast.success("Product updated");
      setEditProduct(null);
    } catch {
      toast.error("Failed to update product");
    } finally {
      setSaving(false);
    }
  };

  const saveShort = async (e) => {
    e.preventDefault();
    if (!editShort) return;
    try {
      setSaving(true);
      const res = await api.put(`/api/shorts/${editShort.id}`, {
        title: editShort.title,
        youtubeId: editShort.youtubeId,
      });
      const updated = res.data;
      setShorts((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
      toast.success("Short updated");
      setEditShort(null);
    } catch {
      toast.error("Failed to update short");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <div className="art-badge w-fit">
            <span className="h-2 w-2 rounded-full bg-fuchsia-300" />
            Admin Studio
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold mt-4">
            Dashboard
          </h1>
          <p className="text-white/70 mt-2">
            Manage products and shorts with a crafted workflow.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <Link to="/admin/add-product" className="art-btn-primary">
            Add Product
          </Link>
          <Link to="/admin/add-short" className="art-btn-dark">
            Add Short
          </Link>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mt-6">
        <div className="art-surface p-5 flex items-center justify-between">
          <div>
            <div className="text-sm text-white/70">Products</div>
            <div className="text-2xl font-bold mt-1">{stats.products}</div>
          </div>
          <div className="h-10 w-10 rounded-2xl bg-amber-300/15 border border-amber-200/20" />
        </div>
        <div className="art-surface p-5 flex items-center justify-between">
          <div>
            <div className="text-sm text-white/70">Shorts</div>
            <div className="text-2xl font-bold mt-1">{stats.shorts}</div>
          </div>
          <div className="h-10 w-10 rounded-2xl bg-sky-300/15 border border-sky-200/20" />
        </div>
      </div>

      <div className="flex items-center gap-2 mt-6">
        <button
          onClick={() => setTab("products")}
          className={`art-btn px-4 py-2 rounded-full border ${
            tab === "products"
              ? "bg-white/14 border-white/20"
              : "bg-white/6 border-white/10 hover:bg-white/10"
          }`}
        >
          Products
        </button>
        <button
          onClick={() => setTab("shorts")}
          className={`art-btn px-4 py-2 rounded-full border ${
            tab === "shorts"
              ? "bg-white/14 border-white/20"
              : "bg-white/6 border-white/10 hover:bg-white/10"
          }`}
        >
          Shorts
        </button>

        <div className="ml-auto flex items-center gap-2">
          <button onClick={refresh} className="art-btn-dark px-4 py-2 rounded-full">
            Refresh
          </button>
        </div>
      </div>

      <div className="mt-5">
        <AnimatePresence mode="wait" initial={false}>
          {tab === "products" ? (
            <motion.div
              key="products"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="art-card p-5 sm:p-7"
            >
              {loading ? (
                <div className="text-white/70">Loading…</div>
              ) : products.length === 0 ? (
                <div className="text-white/70">No products yet.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="text-xs uppercase text-white/60">
                      <tr>
                        <th className="py-3 pr-4">Product</th>
                        <th className="py-3 pr-4">Images</th>
                        <th className="py-3 pr-4">Created</th>
                        <th className="py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {products.map((p) => (
                        <tr key={p.id} className="border-t border-white/10">
                          <td className="py-4 pr-4">
                            <div className="flex items-center gap-4 min-w-[320px]">
                              <div className="h-12 w-12 rounded-2xl overflow-hidden bg-white/5 border border-white/10">
                                {Array.isArray(p.images) && p.images[0] ? (
                                  <img
                                    src={p.images[0]}
                                    alt={p.title}
                                    className="h-full w-full object-cover"
                                  />
                                ) : null}
                              </div>
                              <div>
                                <div className="font-semibold text-white">
                                  {p.title}
                                </div>
                                <div className="text-white/60 line-clamp-1">
                                  {p.description}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 pr-4 text-white/70">
                            {Array.isArray(p.images) ? p.images.length : 0}
                          </td>
                          <td className="py-4 pr-4 text-white/70">
                            {formatDate(p.createdAt)}
                          </td>
                          <td className="py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                className="art-btn-dark px-3 py-2 rounded-lg"
                                onClick={() =>
                                  setEditProduct({
                                    id: p.id,
                                    title: p.title || "",
                                    description: p.description || "",
                                    images: p.images || [],
                                    newImages: [],
                                  })
                                }
                              >
                                Edit
                              </button>
                              <button
                                className="art-btn-danger px-3 py-2 rounded-lg"
                                onClick={() => deleteProduct(p.id)}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="shorts"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="art-card p-5 sm:p-7"
            >
              {loading ? (
                <div className="text-white/70">Loading…</div>
              ) : shorts.length === 0 ? (
                <div className="text-white/70">No shorts yet.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="text-xs uppercase text-white/60">
                      <tr>
                        <th className="py-3 pr-4">Short</th>
                        <th className="py-3 pr-4">YouTube ID</th>
                        <th className="py-3 pr-4">Created</th>
                        <th className="py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {shorts.map((s) => (
                        <tr key={s.id} className="border-t border-white/10">
                          <td className="py-4 pr-4">
                            <div className="flex items-center gap-4 min-w-[320px]">
                              <div className="h-12 w-20 rounded-2xl overflow-hidden bg-white/5 border border-white/10">
                                {s.youtubeId ? (
                                  <img
                                    src={`https://img.youtube.com/vi/${s.youtubeId}/hqdefault.jpg`}
                                    alt={s.title || "Short"}
                                    className="h-full w-full object-cover"
                                  />
                                ) : null}
                              </div>
                              <div>
                                <div className="font-semibold text-white">
                                  {s.title || "Craft short"}
                                </div>
                                <div className="text-white/60">
                                  YouTube embed
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 pr-4 text-white/70 font-mono">
                            {s.youtubeId}
                          </td>
                          <td className="py-4 pr-4 text-white/70">
                            {formatDate(s.createdAt)}
                          </td>
                          <td className="py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                className="art-btn-dark px-3 py-2 rounded-lg"
                                onClick={() =>
                                  setEditShort({
                                    id: s.id,
                                    title: s.title || "",
                                    youtubeId: s.youtubeId || "",
                                  })
                                }
                              >
                                Edit
                              </button>
                              <button
                                className="art-btn-danger px-3 py-2 rounded-lg"
                                onClick={() => deleteShort(s.id)}
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {editProduct && (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/70"
              onClick={() => (saving ? null : setEditProduct(null))}
            />
            <motion.form
              onSubmit={saveProduct}
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: 0.98 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="relative w-full max-w-2xl art-card p-6 sm:p-8"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm text-white/70">Edit product</div>
                  <div className="text-xl font-bold mt-1">Update details</div>
                </div>
                <button
                  type="button"
                  className="art-btn-dark px-3 py-2 rounded-full"
                  onClick={() => (saving ? null : setEditProduct(null))}
                >
                  Close
                </button>
              </div>

              <div className="mt-6 grid gap-4">
                <input
                  className="art-input"
                  placeholder="Title"
                  value={editProduct.title}
                  onChange={(e) =>
                    setEditProduct((p) => ({ ...p, title: e.target.value }))
                  }
                  required
                />
                <textarea
                  className="art-textarea"
                  rows={4}
                  placeholder="Description"
                  value={editProduct.description}
                  onChange={(e) =>
                    setEditProduct((p) => ({ ...p, description: e.target.value }))
                  }
                  required
                />

                <div className="art-surface p-4">
                  <div className="text-sm text-white/80 font-semibold">
                    Replace images (optional)
                  </div>
                  <div className="text-xs text-white/60 mt-1">
                    If you select new images, they replace the existing ones.
                  </div>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="mt-3 w-full text-white/80"
                    onChange={(e) =>
                      setEditProduct((p) => ({
                        ...p,
                        newImages: Array.from(e.target.files || []),
                      }))
                    }
                  />
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-2">
                <button
                  type="button"
                  className="art-btn-dark px-4 py-2 rounded-xl"
                  disabled={saving}
                  onClick={() => setEditProduct(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="art-btn-primary px-5 py-2 rounded-xl"
                  disabled={saving}
                >
                  {saving ? "Saving…" : "Save"}
                </button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {editShort && (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/70"
              onClick={() => (saving ? null : setEditShort(null))}
            />
            <motion.form
              onSubmit={saveShort}
              initial={{ opacity: 0, y: 14, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 14, scale: 0.98 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="relative w-full max-w-xl art-card p-6 sm:p-8"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm text-white/70">Edit short</div>
                  <div className="text-xl font-bold mt-1">Update details</div>
                </div>
                <button
                  type="button"
                  className="art-btn-dark px-3 py-2 rounded-full"
                  onClick={() => (saving ? null : setEditShort(null))}
                >
                  Close
                </button>
              </div>

              <div className="mt-6 grid gap-4">
                <input
                  className="art-input"
                  placeholder="Title (optional)"
                  value={editShort.title}
                  onChange={(e) =>
                    setEditShort((s) => ({ ...s, title: e.target.value }))
                  }
                />
                <input
                  className="art-input"
                  placeholder="YouTube ID"
                  value={editShort.youtubeId}
                  onChange={(e) =>
                    setEditShort((s) => ({ ...s, youtubeId: e.target.value }))
                  }
                  required
                />
              </div>

              <div className="mt-6 flex items-center justify-end gap-2">
                <button
                  type="button"
                  className="art-btn-dark px-4 py-2 rounded-xl"
                  disabled={saving}
                  onClick={() => setEditShort(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="art-btn-primary px-5 py-2 rounded-xl"
                  disabled={saving}
                >
                  {saving ? "Saving…" : "Save"}
                </button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
