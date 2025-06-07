import { useContext, useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; // Ensure it's the default import
import { IoMdArrowRoundBack } from "react-icons/io";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null); // For handling error messages
    const [loading, setLoading] = useState(false); // For loading state
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading
        setError(null); // Clear any previous error
        try {
            const response = await api.post('/auth/login', { email, password });

            // Call the login function from context
            login(response.data, response.data.token);
            setEmail('');
            setPassword('');
            setSuccess(true);
            if(response.data.role === "admin") {
                setTimeout(() => {
                    navigate('/');
                }, 3000);
            } else {
                setTimeout(() => {
                    navigate('/'); // Redirect after successful login
                }, 3000);
            }
        } catch (error) {
            setError("Login failed. Please check your credentials."); // Show error message
            console.error(error);
        } finally {
            setLoading(false); // End loading
        }
    };

    return (
        <div className="h-screen flex justify-center items-center bg-gray-900 text-white px-4">
            {success && (
                <div className="absolute top-10 bg-green-500 px-2 py-3 animate-bounce">Login successful</div>
            )}
            {error && (
                <div className="absolute top-10 bg-red-500 px-2 py-3 animate-bounce">{error}</div> // Display error message
            )}
            <div onClick={() => navigate("/")} className="absolute flex justify-center items-center cursor-pointer group gap-2 text-lg top-5 left-5"><IoMdArrowRoundBack className="group-hover:text-green-500" /><p className="group-hover:text-green-500">Back</p></div>
            <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col gap-5 p-6 bg-gray-800 rounded-xl shadow-xl">
                <h1 className="text-3xl text-green-400 font-bold text-center">Login</h1>

                <input
                    type="email"
                    placeholder="Enter email"
                    className="px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Enter password"
                    className="px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-md transition duration-200 cursor-pointer"
                    disabled={loading} // Disable the button when loading
                >
                    {loading ? "Loading..." : "Login"}
                </button>
            </form>
        </div>
    );
}
