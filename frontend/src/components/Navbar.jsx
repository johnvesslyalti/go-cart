import { useContext, useState } from "react"
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false);

    const handleLogout = () => {
        logout();
        setShowModal(false);
    }

    return(
        <>
            <div className="flex justify-between items-center">
                {user?.role === 'admin' ? (
                    <h1 className="text-3xl font-bold pl-10 text-green-500">Admin</h1>
                ) : (
                    <h1 className="text-3xl font-bold text-green-500">Go Cart</h1>
                )}
                <div className="flex w-sm rounded-md overflow-hidden">
                <input 
                    type="text"
                    placeholder="Search here..."
                    className="flex-1 px-3 py-2 bg-gray-800 text-white placeholder:text-gray-400 rounded-l-md outline-none"
                />
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-r-md transition-all duration-200 cursor-pointer">
                    Search
                </button>
                </div>

                {user ? (
                    user.role === 'user' ? (
                        <div className="flex gap-5">
                        <button className="hover:text-green-500 cursor-pointer">Orders</button>
                        <button className="hover:text-green-500 cursor-pointer">Cart</button>
                        <button className="hover:text-red-500 cursor-pointer" onClick={() => setShowModal(true)}>Logout</button>
                    </div>
                    ) : <div className="flex gap-5">
                    <Link to="/addproduct">
                        <button className="hover:text-green-500 cursor-pointer">Add Product</button>
                    </Link>
                    <button className="hover:text-green-500 cursor-pointer">View Users</button>
                    <button className="hover:text-red-500 cursor-pointer" onClick={() => setShowModal(true)}>Logout</button>
                </div>
                ) : (
                    <ul className="flex gap-10">
                        <Link to="/login">
                            <button className="hover:text-green-500 cursor-pointer">Login</button>
                        </Link>
                        <Link to="/register">
                            <button className="hover:text-green-500 cursor-pointer">Register</button>
                        </Link>
                    </ul>
                )}
            </div>

            {showModal && (
                <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-gray-500 rounded-xl shadow-lg p-6 w-[300px] space y-4">
                        <h2 className="text-2xl text-center font-bold mb-5">Confirm Logout?</h2>
                        <p>Are you sure you want to Logout?</p>
                        <div className="flex justify-center items-center mt-5 gap-5">
                            <button onClick={() => setShowModal(false)} className="bg-green-500 p-2 rounded-lg cursor-pointer">Cancel</button>
                            <button onClick={handleLogout} className="bg-red-500 p-2 rounded-lg cursor-pointer">Logout</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}