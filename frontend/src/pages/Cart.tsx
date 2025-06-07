import { useContext, useEffect, useState } from "react";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";
import Back from "../components/Back";

export default function Cart() {
const [cart, setCart] = useState(null);
const [loading, setLoading] = useState(true); 
const { token } = useContext(AuthContext);

const fetchCart = async () => {
    try {
    const res = await api.get('/cart', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    
    setCart(res.data);

    } catch (error) {
        console.error("Error fetching cart:", error);
    } finally {
    setLoading(false);
    }
};

    useEffect(() => {
        fetchCart();
    }, []);

    if (loading) return <p className="p-5">Loading cart...</p>;
    if (!cart || cart.items.length === 0) return <p className="p-5">Your cart is empty.</p>;

return (
    <div className="min-h-screen p-5">
        <Back />
        <h1 className="text-5xl text-center">Your Cart</h1>
        <div className="grid grid-cols-5 gap-5 py-10">
            {cart.items.map((item) => {
    if (!item?.productId) return null; // skip items with missing product data

    return (
        <div key={item.productId._id} className="p-5 bg-gray-700 rounded-2xl flex flex-col justify-between h-[300px] hover:scale-101">
            <div className="h-48 overflow-hidden rounded-xl">
                <img
                    src={item.productId.image}
                    alt={item.productId.name}
                    className="w-full h-full object-contain"
                />
            </div>
            <div className="mt-5 flex flex-col flex-grow">
                <p className="font-bold text-xl line-clamp-2 break-words">
                    {item.productId.name}
                </p>
                <p className="text-green-200 mt-1">${item.productId.price}</p>
                <p className="text-xl">Quantity: {item.quantity}</p>
            </div>
        </div>
    );
})}
        </div>
    </div>
)
}
