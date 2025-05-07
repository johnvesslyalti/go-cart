import { useContext, useState } from "react"
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Message from "./Message";
import { CiDeliveryTruck, CiLogin, CiLogout, CiShoppingCart } from "react-icons/ci";
import { FaOpencart } from "react-icons/fa";
import { IoMdLogIn } from "react-icons/io";

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
                    <Link to="/"><h1 className="flex items-center justify-center gap-5 text-3xl font-bold text-green-500"><p>Go Cart</p><FaOpencart className="text-5xl" /></h1></Link>
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
                        <button className="flex items-center justify-center gap-2 hover:text-green-500 cursor-pointer"><CiDeliveryTruck className="text-2xl"/><p>Orders</p></button>
                        <Link to="/cart">
                            <button className="flex items-center justify-center gap-2 hover:text-green-500 cursor-pointer"><CiShoppingCart className="text-2xl"/><p>Cart</p></button>
                        </Link>
                        <button className="flex items-center justify-center gap-2 hover:text-red-500 cursor-pointer" onClick={() => setShowModal(true)}><CiLogout className="text-2xo"/><p>Logout</p></button>
                    </div>
                    ) : <div className="flex gap-5">
                    <Link to="/addproduct">
                        <button className="hover:text-green-500 cursor-pointer">Add Product</button>
                    </Link>
                    <Link to="/users">
                        <button className="hover:text-green-500 cursor-pointer">View Users</button>
                    </Link>
                    <button className="hover:text-red-500 cursor-pointer" onClick={() => setShowModal(true)}>Logout</button>
                </div>
                ) : (
                    <ul className="flex gap-10">
                        <Link to="/login">
                            <button className="flex items-center justify-center gap-2 hover:text-green-500 cursor-pointer"><CiLogin className="text-2xl"/><p>Login</p></button>
                        </Link>
                        <Link to="/register">
                            <button className="flex items-center justify-center gap-2 hover:text-green-500 cursor-pointer"><IoMdLogIn className="text-2xl" /><p>Register</p></button>
                        </Link>
                    </ul>
                )}
            </div>

            <Message showMessage={showModal} setShowMessage={setShowModal} message={"Do you really want to logout?"} func={handleLogout} btn={"logout"}/>
        </>
    )
}