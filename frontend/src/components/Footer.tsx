import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export interface IUser {
  role: "user" | "admin" | string;
}

export interface IAuthContext {
  user: IUser | null;
}

const Footer: React.FC = () => {
  const { user } = useContext(AuthContext) as IAuthContext;
  const navigate = useNavigate();

  const goto = async (path: string): Promise<void> => {
    await navigate(path);
  };

  return (
    <footer className="bg-[#0f172a] text-white mt-12">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-green-400 mb-3">GoCart</h2>
          <p className="text-sm text-gray-400">
            Your go-to destination for everything you love. Fast, simple, and secure shopping.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-green-300">Quick Links</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            {user?.role === "user" ? (
              <>
                <li>
                  <button onClick={() => goto("/")} className="hover:text-green-400 transition">
                    Home
                  </button>
                </li>
                <li>
                  <button onClick={() => goto("/orders")} className="hover:text-green-400 transition">
                    Orders
                  </button>
                </li>
                <li>
                  <button onClick={() => goto("/cart")} className="hover:text-green-400 transition">
                    Cart
                  </button>
                </li>
              </>
            ) : user?.role === "admin" ? (
              <>
                <li>
                  <button onClick={() => goto("/")} className="hover:text-green-400 transition">
                    Home
                  </button>
                </li>
                <li>
                  <button onClick={() => goto("/addproduct")} className="hover:text-green-400 transition">
                    Add Products
                  </button>
                </li>
                <li>
                  <button onClick={() => goto("/viewusers")} className="hover:text-green-400 transition">
                    View Users
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <button onClick={() => goto("/")} className="hover:text-green-400 transition">
                    Home
                  </button>
                </li>
                <li>
                  <button onClick={() => goto("/register")} className="hover:text-green-400 transition">
                    Register
                  </button>
                </li>
                <li>
                  <button onClick={() => goto("/login")} className="hover:text-green-400 transition">
                    Login
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-green-300">Contact Us</h3>
          <ul className="space-y-1 text-sm text-gray-400">
            <li>Email: support@gocart.com</li>
            <li>Phone: +91 98765 43210</li>
            <li>Location: India</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-500">
        &copy; {new Date().getFullYear()} GoCart. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;