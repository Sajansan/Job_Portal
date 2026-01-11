import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { registerUser } from "../../services/authService";

const Register = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "job_seeker",
        phone: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await registerUser(formData);
            toast.success("Registration successful! Please login.");
            navigate("/login");
        } catch (err) {
            toast.error(err.response?.data?.message || "Registration failed");
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
                        Create Account
                    </h1>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        Join us to find your dream job
                    </p>
                </div>

                {/* Register Card */}
                <div className="card">
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium mb-2"
                                style={{ color: 'var(--text-secondary)' }}
                            >
                                Full Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                placeholder="Enter your full name"
                                onChange={handleChange}
                                className="form-input"
                                required
                            />
                        </div>

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
                                name="email"
                                type="email"
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
                                name="password"
                                type="password"
                                placeholder="Create a password"
                                onChange={handleChange}
                                className="form-input"
                                required
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="phone"
                                className="block text-sm font-medium mb-2"
                                style={{ color: 'var(--text-secondary)' }}
                            >
                                Phone Number
                            </label>
                            <input
                                id="phone"
                                name="phone"
                                placeholder="Enter your phone number"
                                onChange={handleChange}
                                className="form-input"
                                required
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="role"
                                className="block text-sm font-medium mb-2"
                                style={{ color: 'var(--text-secondary)' }}
                            >
                                I am a
                            </label>
                            <select
                                id="role"
                                name="role"
                                onChange={handleChange}
                                className="form-input cursor-pointer"
                            >
                                <option value="job_seeker">Job Seeker</option>
                                <option value="employer">Employer</option>
                            </select>
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
                                    Creating account...
                                </span>
                            ) : (
                                "Create Account"
                            )}
                        </button>
                    </form>

                    {/* Login Link */}
                    <div
                        className="mt-6 pt-6 text-center border-t"
                        style={{ borderColor: 'var(--border)' }}
                    >
                        <p style={{ color: 'var(--text-secondary)' }}>
                            Already have an account?{" "}
                            <Link to="/login" className="auth-link">
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
