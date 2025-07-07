import { useContext, useState } from "react";
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

const Navbar: React.FC<NavbarProps> = ({ search, onSearchChange }) => {
  const { user, logout } = useContext(AuthContext) as IAuthProps;
  const [showModal, setShowModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setShowModal(false);
  };

  return (
    <>
      {/* Top Nav */}
      <header className="bg-[#0f172a] text-white py-4 px-5 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 text-green-400 text-2xl font-bold">
              <FaOpencart className="text-3xl" />
              {user?.role === "admin" ? "Admin" : "Go Cart"}
            </Link>
          </div>

          {/* Search (hidden on small screens) */}
          <div className="hidden md:flex flex-1 mx-5 max-w-md">
            <input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search products..."
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder:text-gray-400 focus:outline-none"
            />
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-6">
            {user ? (
              user.role === "user" ? (
                <>
                  <button className="flex items-center gap-2 hover:text-green-400">
                    <CiDeliveryTruck className="text-2xl" />
                    Orders
                  </button>
                  <Link to="/cart" className="flex items-center gap-2 hover:text-green-400">
                    <CiShoppingCart className="text-2xl" />
                    Cart
                  </Link>
                  <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 hover:text-red-400"
                  >
                    <CiLogout className="text-2xl" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/addproduct" className="hover:text-green-400">
                    Add Product
                  </Link>
                  <Link to="/users" className="hover:text-green-400">
                    View Users
                  </Link>
                  <button
                    onClick={() => setShowModal(true)}
                    className="hover:text-red-400"
                  >
                    Logout
                  </button>
                </>
              )
            ) : (
              <>
                <Link to="/login" className="hover:text-green-400">
                  Login
                </Link>
                <Link to="/register" className="hover:text-green-400">
                  Register
                </Link>
              </>
            )}
          </nav>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-3xl" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <RxCross1 /> : <CiMenuBurger />}
          </button>
        </div>
      </header>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-[#1e293b] text-white py-4 px-6 space-y-4">
          {user ? (
            user.role === "user" ? (
              <>
                <button className="flex items-center gap-2 hover:text-green-400">
                  <CiDeliveryTruck className="text-xl" />
                  Orders
                </button>
                <Link to="/cart" onClick={() => setMenuOpen(false)}>
                  <div className="flex items-center gap-2 hover:text-green-400">
                    <CiShoppingCart className="text-xl" />
                    Cart
                  </div>
                </Link>
                <button
                  onClick={() => {
                    setShowModal(true);
                    setMenuOpen(false);
                  }}
                  className="flex items-center gap-2 hover:text-red-400"
                >
                  <CiLogout className="text-xl" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/addproduct" onClick={() => setMenuOpen(false)} className="hover:text-green-400 block">
                  Add Product
                </Link>
                <Link to="/users" onClick={() => setMenuOpen(false)} className="hover:text-green-400 block">
                  View Users
                </Link>
                <button
                  onClick={() => {
                    setShowModal(true);
                    setMenuOpen(false);
                  }}
                  className="hover:text-red-400 block"
                >
                  Logout
                </button>
              </>
            )
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)} className="hover:text-green-400 block">
                Login
              </Link>
              <Link to="/register" onClick={() => setMenuOpen(false)} className="hover:text-green-400 block">
                Register
              </Link>
            </>
          )}
        </div>
      )}

      {/* Logout Confirmation Modal */}
      <Message
        showMessage={showModal}
        setShowMessage={setShowModal}
        message="Do you really want to logout?"
        func={handleLogout}
        btn="Logout"
      />
    </>
  );
};

export default Navbar;