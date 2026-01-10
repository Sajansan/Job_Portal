import { useState } from "react";
import { loginUser } from "../../services/authService";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const data = await loginUser(formData);

            // Save JWT
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            alert("Login successful");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="max-w-md mx-auto bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

            {error && (
                <p className="bg-red-500/20 text-red-400 p-2 rounded mb-4">
                    {error}
                </p>
            )}

            <form className="space-y-4" onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md"
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md"
                    required
                />

                <button className="w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded-md transition">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
