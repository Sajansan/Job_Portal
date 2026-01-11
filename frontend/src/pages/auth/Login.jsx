import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { loginUser } from "../../services/authService";

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = await loginUser(formData);

            // Save auth data
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            toast.success("Login successful");

            // Role-based redirect
            if (data.user.role === "job_seeker") {
                navigate("/jobs");
            } else {
                navigate("/dashboard");
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-8"
            style={{ backgroundColor: 'var(--bg-primary)' }}
        >
            <div className="w-full max-w-md">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1
                        className="text-3xl font-bold mb-2"
                        style={{ color: 'var(--text-primary)' }}
                    >
                        Welcome Back
                    </h1>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        Sign in to access your account
                    </p>
                </div>

                {/* Login Card */}
                <div className="card">
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium mb-2"
                                style={{ color: 'var(--text-secondary)' }}
                            >
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                onChange={handleChange}
                                className="form-input"
                                required
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium mb-2"
                                style={{ color: 'var(--text-secondary)' }}
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                onChange={handleChange}
                                className="form-input"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary mt-6"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle
                                            className="opacity-25"
                                            cx="12" cy="12" r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                            fill="none"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        />
                                    </svg>
                                    Signing in...
                                </span>
                            ) : (
                                "Sign In"
                            )}
                        </button>
                    </form>

                    {/* Register Link */}
                    <div
                        className="mt-6 pt-6 text-center border-t"
                        style={{ borderColor: 'var(--border)' }}
                    >
                        <p style={{ color: 'var(--text-secondary)' }}>
                            Don't have an account?{" "}
                            <Link to="/register" className="auth-link">
                                Register
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
