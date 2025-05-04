import { BrowserRouter, Route, Routes } from "react-router-dom"; // Correct import
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AuthProvider  from "./context/AuthContext";

export default function App() {
    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </div>
    );
}
