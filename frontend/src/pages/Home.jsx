import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import api from "../utils/api";

export default function Home() {
    const [products, setProducts] = useState([]);

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
                    <div className="p-5 bg-gray-700 rounded-2xl cursor-pointer hover:scale-101" key={product._id}>
                        <div className="h-50 overflow-hidden rounded-xl">
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover"/>
                        </div>
                        <p className="font-bold text-xl mt-5">{product.name}</p>
                        <p className="text-green-200">${product.price}</p>
                        <div className="flex justify-between items-center gap-2 mt-3">
                            <button className="bg-green-500 px-3 py-2 rounded-xl text-sm cursor-pointer">Add to cart</button>
                            <button className="bg-green-600 px-3 py-2 rounded-xl text-sm cursor-pointer">Buy now</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}