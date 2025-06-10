import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AuthProvider, { AuthContext } from "./context/AuthContext";
import Product from "./pages/Product";
import AddProduct from "./pages/AddProduct";
import AdminRoute from "./routes/AdminRoute";
import Footer from "./components/Footer";
import Users from "./pages/Users";
import UserRoute from "./routes/UserRoute";
import Cart from "./pages/Cart";
import EditProduct from "./pages/EditProduct";
import { User } from "./types/types";

function AppRoutes() {
    const { user } = useContext(AuthContext) as {user: User}; // ✅ Now this is inside AuthProvider

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/:id" element={<Product />} />
            <Route path="/addproduct" element={<AdminRoute user={user}><AddProduct /></AdminRoute>} />
            <Route path="/users" element={<AdminRoute user={user}><Users /></AdminRoute>} />
            <Route path="/cart" element={<UserRoute user={user}><Cart /></UserRoute>} />
            <Route path="/edit/:id" element={<EditProduct />}></Route>
        </Routes>
    );
}

export default function App() {
    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <AuthProvider>
                <BrowserRouter>
                    <div className="flex-grow">
                        <AppRoutes />
                    </div> {/* ✅ Now this has access to context */}
                    <Footer />
                </BrowserRouter>
            </AuthProvider>
        </div>
    );
}
