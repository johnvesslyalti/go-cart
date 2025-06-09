import { useContext, useEffect, useState } from "react";
import api from "../utils/api";
import { useParams } from "react-router-dom";
import Back from "../components/Back";
import { AuthContext } from "../context/AuthContext";
import Successful from "../components/Successful";
import { Product } from "./Cart";

export default function EditProduct() {
    const { id } = useParams<string>();
    const {token} = useContext(AuthContext) as {token: string};
    const [success, setSuccess] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [product, setProduct] = useState<Product>({
        name: "",
        description: "",
        price: 0,
        category: "",
        stock: 0,
        image: ""
    });
    

    useEffect(() => {
        api.get(`/products/${id}`)
            .then(res => setProduct(res.data as Product))
            .catch(err => console.error(err));
    }, [id]);

    const handleUpdate = async () => {
        setLoading(true);
        try {
            await api.put(`/products/${id}`, product, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setSuccess(true); 
            
        } catch (error) {
            console.error("Update failed:", error);
            alert("Update failed!");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            {success && <Successful message={"Product updated successfully"}/>}
            <Back />
            <form
                onSubmit={e => {
                    e.preventDefault();
                    handleUpdate();
                }}
                className="w-full max-w-md flex flex-col gap-5 p-6 bg-gray-800 rounded-xl shadow-xl"
            >
                <h1 className="text-3xl text-green-400 font-bold text-center">Edit Product</h1>

                <input
                    type="text"
                    placeholder="Product Name"
                    className="px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
                    value={product.name}
                    onChange={e => setProduct({ ...product, name: e.target.value })}
                />

                <textarea
                    placeholder="Product Description"
                    className="px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
                    rows={3}
                    value={product.description}
                    onChange={e => setProduct({ ...product, description: e.target.value })}
                />

                <input
                    type="number"
                    placeholder="Price"
                    className="appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
                    value={product.price}
                    onChange={e => setProduct({ ...product, price: Number(e.target.value) })}
                />

                <input
                    type="text"
                    placeholder="Category"
                    className="px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
                    value={product.category}
                    onChange={e => setProduct({ ...product, category: e.target.value })}
                />

                <input
                    type="number"
                    placeholder="Stock"
                    className="appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
                    value={product.stock}
                    onChange={e => setProduct({ ...product, stock: Number(e.target.value) })}
                />

                <input
                    type="text"
                    placeholder="Image URL"
                    className="px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
                    value={product.image}
                    onChange={e => setProduct({ ...product, image: e.target.value })}
                />

                <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-md transition duration-200 cursor-pointer"
                    disabled={loading}
                >
                    {loading ? "Updating..." : "Update Product"}
                </button>
            </form>
        </div>
    );
}
