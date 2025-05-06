import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AuthProvider, { AuthContext } from "./context/AuthContext";
import Product from "./pages/Product";

function AppRoutes() {
    const { user } = useContext(AuthContext); // ✅ Now this is inside AuthProvider
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/:id" element={<Product />} />
        </Routes>
    );
}

export default function App() {
    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <AuthProvider>
                <BrowserRouter>
                    <AppRoutes /> {/* ✅ Now this has access to context */}
                </BrowserRouter>
            </AuthProvider>
        </div>
    );
}
