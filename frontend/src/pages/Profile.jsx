import { useEffect, useState } from "react";
import { getUserProfile } from "../api/usersApi";
import toast from "react-hot-toast";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUserProfile()
            .then((res) => {
                setUser(res.data);
            })
            .catch((err) => {
                toast.error(err.response?.data?.message || "Failed to load profile");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div
                className="min-h-[calc(100vh-120px)] flex items-center justify-center"
                style={{ backgroundColor: 'var(--bg-primary)' }}
            >
                <div className="flex items-center gap-3">
                    <svg className="animate-spin h-8 w-8" style={{ color: 'var(--accent)' }} viewBox="0 0 24 24">
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
                    <span style={{ color: 'var(--text-secondary)' }}>Loading profile...</span>
                </div>
            </div>
        );
    }

    return (
        <div
            className="min-h-[calc(100vh-120px)] py-8 px-4"
            style={{ backgroundColor: 'var(--bg-primary)' }}
        >
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1
                        className="text-3xl font-bold mb-2"
                        style={{ color: 'var(--text-primary)' }}
                    >
                        My Profile
                    </h1>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        Manage your account information
                    </p>
                </div>

                {/* Profile Card */}
                <div className="card">
                    {/* Avatar Section */}
                    <div className="flex flex-col items-center mb-8">
                        <div
                            className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold text-white mb-4"
                            style={{ background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%)' }}
                        >
                            {user?.name?.charAt(0).toUpperCase() || "U"}
                        </div>
                        <span
                            className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide"
                            style={{
                                backgroundColor: user?.role === 'employer' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(99, 102, 241, 0.15)',
                                color: user?.role === 'employer' ? 'var(--success)' : 'var(--accent)'
                            }}
                        >
                            {user?.role?.replace('_', ' ') || "User"}
                        </span>
                    </div>

                    {/* Info Grid */}
                    <div className="space-y-6">
                        <div
                            className="p-4 rounded-lg"
                            style={{ backgroundColor: 'var(--bg-tertiary)' }}
                        >
                            <label
                                className="block text-sm font-medium mb-1"
                                style={{ color: 'var(--text-muted)' }}
                            >
                                Full Name
                            </label>
                            <p
                                className="text-lg font-semibold"
                                style={{ color: 'var(--text-primary)' }}
                            >
                                {user?.name || "Not provided"}
                            </p>
                        </div>

                        <div
                            className="p-4 rounded-lg"
                            style={{ backgroundColor: 'var(--bg-tertiary)' }}
                        >
                            <label
                                className="block text-sm font-medium mb-1"
                                style={{ color: 'var(--text-muted)' }}
                            >
                                Email Address
                            </label>
                            <p
                                className="text-lg font-semibold"
                                style={{ color: 'var(--text-primary)' }}
                            >
                                {user?.email || "Not provided"}
                            </p>
                        </div>

                        <div
                            className="p-4 rounded-lg"
                            style={{ backgroundColor: 'var(--bg-tertiary)' }}
                        >
                            <label
                                className="block text-sm font-medium mb-1"
                                style={{ color: 'var(--text-muted)' }}
                            >
                                Phone Number
                            </label>
                            <p
                                className="text-lg font-semibold font-mono"
                                style={{ color: 'var(--text-primary)' }}
                            >
                                {user?.phone || "Not provided"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
