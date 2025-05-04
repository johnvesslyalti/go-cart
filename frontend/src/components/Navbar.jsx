import { useContext } from "react"
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
    const { user } = useContext(AuthContext);

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
                <div className="flex gap-5">
                    <button>Orders</button>
                    <button>Cart</button>
                    <button>Logout</button>
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