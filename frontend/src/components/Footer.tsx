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
      <footer className="bg-gray-800 text-white py-10 mt-10">
        <div className="max-w-7xl mx-auto px-5 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Brand / Logo */}
          <div>
            <h2 className="text-2xl font-bold mb-2">GoCart</h2>
            <p className="text-sm text-gray-400">
              Your go-to destination for everything you love. Fast, simple, and secure shopping.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <div className="space-y-2 text-gray-300">
            { user?.role === "user" ? (
              <>
                <button onClick={() => goto("/")} className="cursor-pointer">Home</button><br />
                <button onClick={() => goto("/orders")} className="cursor-pointer">Orders</button><br />
                <button onClick={() => goto("/cart")} className="cursor-pointer">Cart</button>
              </>
            ) : user?.role === 'admin' ? (
              <>
                <button onClick={() => goto("/")} className="cursor-pointer">Home</button><br />
                <button onClick={() => goto("/addproduct")} className="cursor-pointer">Add Products</button><br />
                <button onClick={() => goto("/viewusers")} className="cursor-pointer">View Users</button>
              </>
            ) : (
              <>
                <button onClick={() => goto("/")} className="cursor-pointer">Home</button><br />
                <button onClick={() => goto("/register")} className="cursor-pointer">Register</button><br />
                <button onClick={() => goto("/login")} className="cursor-pointer">Login</button>
              </>
            )}
             </div>
          </div>
  
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
            <p className="text-gray-400 text-sm">Email: support@gocart.com</p>
            <p className="text-gray-400 text-sm">Phone: +91 98765 43210</p>
            <p className="text-gray-400 text-sm">Location: India</p>
          </div>
        </div>
  
        {/* Copyright */}
        <div className="mt-8 text-center text-sm text-gray-500 border-t border-gray-700 pt-5">
          &copy; {new Date().getFullYear()} GoCart. All rights reserved.
        </div>
      </footer>
    );
  }
  
export default Footer;