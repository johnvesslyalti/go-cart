import { useContext } from "react"
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
    const { user, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
    }

    return(
        <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-green-500">Go Cart</h1>
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
                    <button className="hover:text-red-500 cursor-pointer" onClick={handleLogout}>Logout</button>
                </div>
                ) : <div className="flex gap-10">
                <button className="hover:text-green-500 cursor-pointer">Add Product</button>
                <button className="hover:text-red-500 cursor-pointer" onClick={handleLogout}>Logout</button>
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
    )
}