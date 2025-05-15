import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import api from "../apis/service";
import type { IUser } from "../models/user";
import { Alert } from "../components/Alert";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [alert, setAlert] = useState<{ type: "error" | "success"; message: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const user = { email, password } as IUser;
      const response = await api.callLoginUser(user);
      if (response.IsSuccess) {
        const token = response.data.token;
        Cookies.set("authToken", token, { expires: 7 });
        setAlert({ type: "success", message: "Login successful" });
        setTimeout(() => {
            navigate("/");
        }, 2000);
      } else {
        setAlert({ type: "error", message: response.message || "Login failed" });
      }
    } catch (err) {
      setAlert({ type: "error", message: "An error occurred during login" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        {alert && (
            <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
            duration={5000}
        />
        )}       
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">Login</h1>
            <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
                required
                />
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 mb-2">Password</label>
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md"
                required
                />
            </div>
            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
                Login
            </button>
            </form>
            <p className="mt-4 text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <a href="/register" className="text-blue-600 hover:text-blue-500 font-medium">
                Sign up
                </a>
            </p>
        </div>
    </div>
  );
}