import { FormEvent, JSX, useContext, useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { IoMdArrowRoundBack } from "react-icons/io";
import { LoginResponse } from "../types/types";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { MdGppGood } from "react-icons/md";

export default function Login(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePassword = () => {
    setShowPassword(prev => !prev)
  }

  const authContext = useContext(AuthContext);
    if (!authContext) {
        throw new Error("AuthContext must be used within an AuthProvider");
    }
    const { login } = authContext;

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoading(true);
  setError(null);

  try {
    const response = await api.post<LoginResponse>("/auth/login", { email, password });
    const data: LoginResponse = response.data;

    const { token, ...user } = data;

    if (!token || !user || !user.role) {
      throw new Error("Invalid login response.");
    }

    login(user, token);

    setEmail("");
    setPassword("");
    setSuccess(true);

    setTimeout(() => {
      navigate(user.role === "admin" ? "/" : "/");
    }, 3000);
  } catch (err: any) {
    const message =
      err.response?.data?.message || err.message || "Login failed. Please check your credentials.";
    setError(message);
    console.error("Login error:", err);
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="h-screen flex justify-center items-center bg-gray-900 text-white px-4 relative">
      {success && (
        <div className="absolute flex items-center justify-center gap-2 top-10 bg-green-500 px-2 py-3 rounded">
          <span><MdGppGood /></span><p>Login successful</p>
        </div>
      )}
      {error && (
        <div className="absolute top-10 bg-red-500 px-2 py-3 rounded animate-bounce">{error}</div>
      )}
      <div
        onClick={() => navigate("/")}
        className="absolute top-5 left-5 flex items-center gap-2 cursor-pointer group text-lg"
      >
        <IoMdArrowRoundBack className="group-hover:text-green-500" />
        <p className="group-hover:text-green-500">Back</p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm flex flex-col gap-5 p-6 bg-gray-800 rounded-xl shadow-xl"
      >
        <h1 className="text-3xl text-green-400 font-bold text-center">Login</h1>

        <input
          type="email"
          placeholder="Enter email"
          className="px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

                <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            className="px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="absolute top-3 right-2"
            onClick={togglePassword}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
          </button>
        </div>

        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-md transition duration-200 cursor-pointer disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
}
