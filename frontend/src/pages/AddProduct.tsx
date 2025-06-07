import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function AddProduct() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState("");
    const [imgURL, setImgURL] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await api.post(
                "/products/",
                { name, description, price, category, stock, image: imgURL },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setSuccess(true);
            setName("");
            setDescription("");
            setPrice(0);
            setCategory("");
            setStock(0);
            setImgURL("");
        } catch (err) {
            console.error(err);
            setError("Failed to add product. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white p-10">
            {success && (
                <div className="absolute top-10 bg-green-500 px-4 py-3 rounded shadow-lg">
                    Product added successfully!
                </div>
            )}
            {error && (
                <div className="absolute top-10 bg-red-500 px-4 py-3 rounded animate-bounce shadow-lg">
                    {error}
                </div>
            )}
            <div onClick={() => navigate("/")} className="absolute flex justify-center items-center cursor-pointer group gap-2 text-lg top-5 left-5">
                <IoMdArrowRoundBack className="group-hover:text-green-500" />
                <p className="group-hover:text-green-500">Back</p>
            </div>
            <form onSubmit={handleSubmit} className="w-full max-w-md flex flex-col gap-5 p-6 bg-gray-800 rounded-xl shadow-xl">
                <h1 className="text-3xl text-green-400 font-bold text-center">Add Product</h1>

                <input
                    type="text"
                    placeholder="Product Name"
                    className="px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <textarea
                    placeholder="Product Description"
                    className="px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                ></textarea>

                <input
                    type="number"
                    placeholder="Price"
                    className="
                    appearance-none
                    [&::-webkit-outer-spin-button]:appearance-none 
                    [&::-webkit-inner-spin-button]:appearance-none
                    px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Category"
                    className="px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Stock"
                    className="appearance-none
                    [&::-webkit-outer-spin-button]:appearance-none 
                    [&::-webkit-inner-spin-button]:appearance-none
                    px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Image URL"
                    className="px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
                    value={imgURL}
                    onChange={(e) => setImgURL(e.target.value)}
                />

                <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-md transition duration-200 cursor-pointer"
                    disabled={loading}
                >
                    {loading ? "Adding..." : "Add Product"}
                </button>
            </form>
        </div>
    );
}
