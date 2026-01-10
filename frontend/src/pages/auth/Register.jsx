import { useState } from "react";
import { registerUser } from "../../services/authService";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "job_seeker",
        phone: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await registerUser(formData);
            alert("Registration successful");
        } catch (err) {
            setError(err.response?.data?.message || "Register failed");
        }
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
            <div className="max-w-md w-full bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

                {error && (
                    <p className="bg-red-500/20 text-red-400 p-2 rounded mb-4">
                        {error}
                    </p>
                )}

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <input
                        name="name"
                        placeholder="Name"
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md"
                        required
                    />

                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md"
                        required
                    />

                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md"
                        required
                    />

                    <input
                        name="phone"
                        placeholder="Phone"
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md"
                        required
                    />

                    <select
                        name="role"
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md"
                    >
                        <option value="job_seeker">Job Seeker</option>
                        <option value="employer">Employer</option>
                    </select>

                    <button className="w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded-md transition">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
