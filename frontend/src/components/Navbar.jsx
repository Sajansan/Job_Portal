import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { getUser, isAuthenticated } from "../utils/auth";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = getUser();
    const loggedIn = isAuthenticated();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
        setMobileMenuOpen(false);
    };

    const isActive = (path) => {
        return location.pathname === path;
    };

    const navLinkStyle = (path) => ({
        color: isActive(path) ? 'var(--accent)' : 'var(--text-secondary)',
        fontWeight: isActive(path) ? '600' : '500'
    });

    return (
        <nav
            className="border-b backdrop-blur-sm sticky top-0 z-50"
            style={{
                backgroundColor: 'var(--bg-secondary)',
                borderColor: 'var(--border)',
            }}
        >
            <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link to={loggedIn ? "/dashboard" : "/"} className="flex items-center gap-2 group">
                        <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white"
                            style={{ background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%)' }}
                        >
                            JP
                        </div>
                        <h1
                            className="text-xl font-bold transition-colors"
                            style={{ color: 'var(--text-primary)' }}
                        >
                            Job Portal
                        </h1>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        {loggedIn ? (
                            <>
                                <Link
                                    to="/dashboard"
                                    className="text-sm transition-colors hover:opacity-80"
                                    style={navLinkStyle('/dashboard')}
                                >
                                    Dashboard
                                </Link>
                                <Link
                                    to="/jobs"
                                    className="text-sm transition-colors hover:opacity-80"
                                    style={navLinkStyle('/jobs')}
                                >
                                    Browse Jobs
                                </Link>
                                {user?.role === "employer" && (
                                    <>
                                        <Link
                                            to="/my-jobs"
                                            className="text-sm transition-colors hover:opacity-80"
                                            style={navLinkStyle('/my-jobs')}
                                        >
                                            My Jobs
                                        </Link>
                                        <Link
                                            to="/jobs/create"
                                            className="text-sm transition-colors hover:opacity-80"
                                            style={navLinkStyle('/jobs/create')}
                                        >
                                            Post Job
                                        </Link>
                                    </>
                                )}
                                {user?.role === "job_seeker" && (
                                    <Link
                                        to="/applied-jobs"
                                        className="text-sm transition-colors hover:opacity-80"
                                        style={navLinkStyle('/applied-jobs')}
                                    >
                                        My Applications
                                    </Link>
                                )}
                                <Link
                                    to="/profile"
                                    className="text-sm transition-colors hover:opacity-80"
                                    style={navLinkStyle('/profile')}
                                >
                                    Profile
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/jobs"
                                    className="text-sm transition-colors hover:opacity-80"
                                    style={navLinkStyle('/jobs')}
                                >
                                    Browse Jobs
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-3">
                        <ThemeToggle />

                        {/* Desktop Auth Buttons */}
                        <div className="hidden md:flex items-center gap-3">
                            {loggedIn ? (
                                <button
                                    onClick={handleLogout}
                                    className="btn-secondary-sm"
                                >
                                    Logout
                                </button>
                            ) : (
                                <>
                                    <Link to="/login" className="btn-secondary-sm">
                                        Login
                                    </Link>
                                    <Link to="/register" className="btn-primary-sm">
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 rounded-lg transition-colors"
                            style={{ color: 'var(--text-primary)' }}
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div
                        className="md:hidden mt-4 pt-4 border-t"
                        style={{ borderColor: 'var(--border)' }}
                    >
                        <div className="flex flex-col gap-3">
                            {loggedIn ? (
                                <>
                                    <Link
                                        to="/dashboard"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="py-2 text-sm transition-colors"
                                        style={navLinkStyle('/dashboard')}
                                    >
                                        Dashboard
                                    </Link>
                                    <Link
                                        to="/jobs"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="py-2 text-sm transition-colors"
                                        style={navLinkStyle('/jobs')}
                                    >
                                        Browse Jobs
                                    </Link>
                                    {user?.role === "employer" && (
                                        <>
                                            <Link
                                                to="/my-jobs"
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="py-2 text-sm transition-colors"
                                                style={navLinkStyle('/my-jobs')}
                                            >
                                                My Jobs
                                            </Link>
                                            <Link
                                                to="/jobs/create"
                                                onClick={() => setMobileMenuOpen(false)}
                                                className="py-2 text-sm transition-colors"
                                                style={navLinkStyle('/jobs/create')}
                                            >
                                                Post Job
                                            </Link>
                                        </>
                                    )}
                                    {user?.role === "job_seeker" && (
                                        <Link
                                            to="/applied-jobs"
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="py-2 text-sm transition-colors"
                                            style={navLinkStyle('/applied-jobs')}
                                        >
                                            My Applications
                                        </Link>
                                    )}
                                    <Link
                                        to="/profile"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="py-2 text-sm transition-colors"
                                        style={navLinkStyle('/profile')}
                                    >
                                        Profile
                                    </Link>
                                    <div className="pt-3 border-t" style={{ borderColor: 'var(--border)' }}>
                                        <button
                                            onClick={handleLogout}
                                            className="btn-secondary w-full"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/jobs"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="py-2 text-sm transition-colors"
                                        style={navLinkStyle('/jobs')}
                                    >
                                        Browse Jobs
                                    </Link>
                                    <div className="pt-3 border-t flex flex-col gap-2" style={{ borderColor: 'var(--border)' }}>
                                        <Link
                                            to="/login"
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="btn-secondary w-full text-center"
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            to="/register"
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="btn-primary w-full text-center"
                                        >
                                            Register
                                        </Link>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
