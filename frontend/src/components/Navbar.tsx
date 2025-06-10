import { useContext, useState } from "react"
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Message from "./Message";
import { CiDeliveryTruck, CiLogout, CiMenuBurger, CiShoppingCart } from "react-icons/ci";
import { FaOpencart } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { User } from "../types/types";

interface NavbarProps {
    search: string;
    onSearchChange: (value: string) => void;
}

interface IAuthProps {
    user: User | null;
    logout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ search, onSearchChange}) => {
    const { user, logout } = useContext(AuthContext) as IAuthProps;
    const [showModal, setShowModal] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        setShowModal(false);
    }

    return(
        <>
            <div className="flex justify-between items-center">
                {user?.role === 'admin' ? (
                    <h1 className="text-3xl font-bold px-3 text-green-500">Admin</h1>
                ) : (
                    <Link to="/"><h1 className="flex items-center justify-center gap-5 text-3xl font-bold text-green-500"><p>Go Cart</p><FaOpencart className="text-5xl" /></h1></Link>
                )}
                <div className="w-sm rounded-md overflow-hidden hidden md:flex">
                <input 
                    type="text"
                    placeholder="Search here..."
                    className="flex-1 px-3 py-2 bg-gray-800 text-white placeholder:text-gray-400 rounded-l-md outline-none"
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
                </div>
                {/* Menu hamburger*/}
                <button
                className="md:hidden text-3xl"
                onClick={() => setMenuOpen(!menuOpen)}
                >   
                    {menuOpen ? <RxCross1 /> : <CiMenuBurger />}
                </button>

                {/* Desktop menu */}
                <div className="hidden md:flex">
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
                            <button className="flex items-center justify-center gap-2 hover:text-green-500 cursor-pointer">Login</button>
                        </Link>
                        <Link to="/register">
                            <button className="flex items-center justify-center gap-2 hover:text-green-500 cursor-pointer">Register</button>
                        </Link>
                    </ul>
                )}
            </div>
            </div>

            {/* mobile screen menu */}
            {menuOpen && (
                <div className="md:hidden bg-gray-900 text-white flex flex-col gap-4 px-4 py-4">
                    {user ? (
            user.role === "user" ? (
              <>
                <button className="flex items-center gap-2 hover:text-green-500" onClick={() => setMenuOpen(false)}>
                  <CiDeliveryTruck className="text-2xl" />
                  Orders
                </button>
                <Link to="/cart" onClick={() => setMenuOpen(false)}>
                  <button className="flex items-center gap-2 hover:text-green-500 w-full text-left">
                    <CiShoppingCart className="text-2xl" />
                    Cart
                  </button>
                </Link>
                <button
                  className="flex items-center gap-2 hover:text-red-500"
                  onClick={() => {
                    setShowModal(true);
                    setMenuOpen(false);
                  }}
                >
                  <CiLogout className="text-2xl" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/addproduct" onClick={() => setMenuOpen(false)}>
                  <button className="hover:text-green-500 w-full text-left">Add Product</button>
                </Link>
                <Link to="/users" onClick={() => setMenuOpen(false)}>
                  <button className="hover:text-green-500 w-full text-left">View Users</button>
                </Link>
                <button
                  className="hover:text-red-500 w-full text-left"
                  onClick={() => {
                    setShowModal(true);
                    setMenuOpen(false);
                  }}
                >
                  Logout
                </button>
              </>
            )
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                <button className="hover:text-green-500 w-full text-left">Login</button>
              </Link>
              <Link to="/register" onClick={() => setMenuOpen(false)}>
                <button className="hover:text-green-500 w-full text-left">Register</button>
              </Link>
            </>
          )}
                </div>
            )}

            <Message showMessage={showModal} setShowMessage={setShowModal} message={"Do you really want to logout?"} func={handleLogout} btn={"logout"}/>
        </>
    )
}

export default Navbar;