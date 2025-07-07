import { FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import { IoMdArrowRoundBack } from "react-icons/io";

const AddProduct: React.FC = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { token } = useContext(AuthContext) as { token: string };
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("stock", stock);
      if (imageFile) formData.append("image", imageFile);

      await api.post("/products", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess(true);
      setName("");
      setDescription("");
      setPrice("");
      setCategory("");
      setStock("");
      setImageFile(null);
      setTimeout(() => setSuccess(false), 2000);
    } catch (err) {
      console.error(err);
      setError("Failed to add product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white flex justify-center items-center px-4 py-10 relative">
      {/* Back */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-5 left-5 flex items-center gap-2 text-sm text-gray-300 hover:text-green-400 transition"
      >
        <IoMdArrowRoundBack className="text-xl" />
        Back
      </button>

      {/* Toasts */}
      {success && (
        <div className="absolute top-5 right-5 bg-green-600 text-white px-5 py-2 rounded-md shadow animate-bounce">
          ✅ Product added!
        </div>
      )}
      {error && (
        <div className="absolute top-5 right-5 bg-red-600 text-white px-5 py-2 rounded-md shadow animate-bounce">
          ❌ {error}
        </div>
      )}

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-gray-800 rounded-2xl shadow-2xl p-8 space-y-5"
      >
        <h1 className="text-3xl font-bold text-center text-green-400">
          Add Product
        </h1>

        <input
          type="text"
          placeholder="Product Name"
          className="w-full bg-gray-700 px-4 py-2 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          placeholder="Product Description"
          rows={3}
          className="w-full bg-gray-700 px-4 py-2 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="Price"
            className="bg-gray-700 px-4 py-2 rounded-md text-white placeholder-gray-400 appearance-none focus:outline-none focus:ring-2 focus:ring-green-400"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            type="number"
            placeholder="Stock"
            className="bg-gray-700 px-4 py-2 rounded-md text-white placeholder-gray-400 appearance-none focus:outline-none focus:ring-2 focus:ring-green-400"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>

        <input
          type="text"
          placeholder="Category"
          className="w-full bg-gray-700 px-4 py-2 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <label className="block bg-gray-700 hover:bg-gray-600 text-center text-sm px-4 py-2 rounded-md cursor-pointer transition">
          {imageFile ? imageFile.name : "Choose Product Image"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 hover:bg-green-600 py-2 rounded-md text-white font-semibold transition duration-200"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;