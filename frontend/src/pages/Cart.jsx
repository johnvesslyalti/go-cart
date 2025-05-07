import { useContext, useEffect, useState } from "react";
import api from "../utils/api";
import { AuthContext } from "../context/AuthContext";

export default function Cart() {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true); // ✅ You were using setLoading but didn't define it
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
            <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
            {cart.items.map((item) => (
                <div key={item.productId._id || item.productId} className="border p-4 mb-3 rounded">
                    <h2>Product ID: {item.productId.name || item.productId}</h2>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ₹{item.price}</p>
                </div>
            ))}
        </div>
    );
}
