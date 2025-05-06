import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Home() {
const [products, setProducts] = useState([]);
const { user } = useContext(AuthContext);

const fetchProducts = async () => {
    const response = await api.get('/products');
    setProducts(response.data);
}

    useEffect(() => {
        fetchProducts();
    }, []);

return(
<div className="p-5">
    <Navbar />
    <div className="grid grid-cols-5 gap-5 py-10">
        {products.map(product => (
            <Link to={`/${product._id}`} key={product._id}>
                <div className="p-5 bg-gray-700 rounded-2xl cursor-pointer hover:scale-101 flex flex-col justify-between h-[400px]">
                    <div className="h-48 overflow-hidden rounded-xl">
                        <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="mt-5 flex flex-col flex-grow justify-between">
                        <div>
                        <p className="font-bold text-xl">{product.name}</p>
                        <p className="text-green-200">${product.price}</p>
                        </div>
                    {user?.role === 'user' || user === null ? (
                    <div className="flex justify-between items-center gap-2 mt-3">
                        <button className="bg-green-500 px-3 py-2 rounded-xl text-sm cursor-pointer">Add to cart</button>
                        <button className="bg-green-600 px-3 py-2 rounded-xl text-sm cursor-pointer">Buy now</button>
                    </div>
                    ) : user?.role === 'admin' ? (
                    <div className="flex justify-center items-center gap-2 mt-3">
                        <button className="bg-green-700 w-full px-3 py-2 rounded-xl text-sm cursor-pointer">Edit Product</button>
                        <button className="bg-red-700 w-full px-3 py-2 rounded-xl text-sm cursor-pointer">Delete Product</button>
                    </div>
                    ) : null}
                    </div>
                </div>

            </Link>
        ))}
        </div>
</div>
)
}