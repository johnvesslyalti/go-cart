import { useState, useEffect, useContext } from "react";
import api from "../utils/api";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { AuthContext } from "../context/AuthContext";

export default function Product() {
    const [product, setProduct] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await api.get(`/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error("Failed to fetch product:", error);
            }
        };

        fetchProduct();
    }, [id]);

    if (!product) return <div className="min-h-screen flex justify-center items-center"><p>Loading...</p></div>;

    return (
        <div className="min-h-screen flex flex-col md:flex-row items-center gap-8 p-5 pt-20">
            <div onClick={() => navigate("/")} className="absolute flex justify-center items-center cursor-pointer group gap-2 text-lg top-5 left-5"><IoMdArrowRoundBack className="group-hover:text-green-500" /><p className="group-hover:text-green-500">Back</p></div>
            <div className="w-full md:w-1/2 flex justify-center">
                <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full max-w-md h-100 object-contain rounded-xl shadow-md"
                />
            </div>
            <div className="w-full md:w-1/2 space-y-4">
                <h2 className="text-3xl font-bold">{product.name}</h2>
                <p className="text-gray-500">{product.description}</p>
                <p className="text-xl font-semibold text-green-600">Price: ₹{product.price}</p>
                {user?.role === 'user' ? (
                    <div className="flex items-center gap-2 mt-3">
                    <button className="bg-green-500 px-3 py-2 rounded-xl text-sm cursor-pointer">Add to cart</button>
                    <button className="bg-green-600 px-3 py-2 rounded-xl text-sm cursor-pointer">Buy now</button>
                </div>
                ) : user?.role === 'admin' ? (
                    <div className="flex items-center gap-2 mt-3">
                        <Link to={`/edit/${id}`}>
                            <button className="bg-green-500 px-3 py-2 rounded-xl text-sm w-[100px] cursor-pointer">Edit</button>
                        </Link>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 mt-3">
                    <button className="bg-green-500 px-3 py-2 rounded-xl text-sm cursor-pointer">Add to cart</button>
                    <button className="bg-green-600 px-3 py-2 rounded-xl text-sm cursor-pointer">Buy now</button>
                    </div>  
                )}
            </div>
        </div>
    );
}
