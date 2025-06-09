import { FormEvent, useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/register', {
                name,
                email,
                password
            });
            setName('');
            setEmail('');
            setPassword('');
            setSuccess(true);
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch(error) {
            console.error(error);
        }
    }

    return (
        <div className="h-screen flex justify-center items-center bg-gray-900 text-white px-4">
            {success && (
                <button className="absolute top-10 bg-green-500 px-2 py-3 animate-bounce">Registration Successful</button>
            )}
            <div onClick={() => navigate("/")} className="absolute flex justify-center items-center cursor-pointer group gap-2 text-lg top-5 left-5"><IoMdArrowRoundBack className="group-hover:text-green-500" /><p className="group-hover:text-green-500">Back</p></div>
            <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col gap-5 p-6 bg-gray-800 rounded-xl shadow-xl">
                <h1 className="text-3xl text-green-400 font-bold text-center">Register</h1>

                <input
                    type="text"
                    placeholder="Enter name"
                    className="px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

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
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
}
