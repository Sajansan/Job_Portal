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
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
        setMobileMenuOpen(false);
        setProfileDropdownOpen(false);
    };

    const isActive = (path) => {
        return location.pathname === path;
    };

    const NavIcon = ({ path, children }) => (
        <svg
            className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            style={{ color: isActive(path) ? 'var(--accent)' : 'inherit' }}
        >
            {children}
        </svg>
    );

    const navLinks = [
        {
            path: "/dashboard",
            label: "Dashboard",
            icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />,
            show: loggedIn
        },
        {
            path: "/jobs",
            label: "Browse Jobs",
            icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
            show: !loggedIn || user?.role !== "employer"
        },
        {
            path: "/my-jobs",
            label: "My Jobs",
            icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />,
            show: loggedIn && user?.role === "employer"
        },
        {
            path: "/applied-jobs",
            label: "My Applications",
            icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />,
            show: loggedIn && user?.role === "job_seeker"
        },
        {
            path: "/profile",
            label: "Profile",
            icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />,
            show: loggedIn
        }
    ];

    return (
        <nav
            className="border-b sticky top-0 z-50 transition-all duration-300 shadow-sm"
            style={{
                backgroundColor: 'var(--bg-primary)',
                borderColor: 'var(--border)',
            }}
        >
            <div className="container mx-auto px-4 sm:px-6 py-3">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link to={loggedIn ? "/dashboard" : "/"} className="flex items-center gap-3 group">
                        <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-lg transform transition-transform group-hover:scale-105"
                            style={{ background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%)' }}
                        >
                            JP
                        </div>
                        <h1
                            className="text-xl font-extrabold tracking-tight hidden sm:block"
                            style={{ color: 'var(--text-primary)' }}
                        >
                            Job<span style={{ color: 'var(--accent)' }}>Portal</span>
                        </h1>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-2">
                        {navLinks.filter(l => l.show).map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`flex items-center gap-2.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 group
                                    ${isActive(link.path)
                                        ? 'bg-opacity-10'
                                        : 'hover:bg-opacity-5'}`}
                                style={{
                                    color: isActive(link.path) ? 'var(--accent)' : 'var(--text-secondary)',
                                    backgroundColor: isActive(link.path) ? 'var(--accent-glow)' : 'transparent'
                                }}
                            >
                                <NavIcon path={link.path}>{link.icon}</NavIcon>
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-2 sm:gap-4">
                        <ThemeToggle />

                        {/* User Profile / Auth Area */}
                        <div className="flex items-center gap-3 ml-2 relative">
                            {loggedIn ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                                        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white transition-all duration-300 hover:scale-105 relative group"
                                        style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border)' }}
                                    >
                                        {user?.name?.charAt(0).toUpperCase()}
                                        <span className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-green-500 border-2 rounded-full" style={{ borderColor: 'var(--bg-tertiary)' }}></span>
                                    </button>

                                    {/* Profile Dropdown */}
                                    {profileDropdownOpen && (
                                        <>
                                            <div
                                                className="fixed inset-0 z-10"
                                                onClick={() => setProfileDropdownOpen(false)}
                                            ></div>
                                            <div
                                                className="absolute right-0 mt-3 w-72 rounded-2xl overflow-hidden shadow-2xl z-20 border animate-in fade-in slide-in-from-top-2 duration-200"
                                                style={{
                                                    backgroundColor: 'var(--bg-secondary)',
                                                    borderColor: 'var(--border)'
                                                }}
                                            >
                                                {/* User Info Section */}
                                                <div className="p-5 flex items-center gap-4">
                                                    <div
                                                        className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold text-white relative shadow-inner"
                                                        style={{ backgroundColor: 'var(--bg-tertiary)' }}
                                                    >
                                                        {user?.name?.charAt(0).toUpperCase()}
                                                        <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 rounded-full" style={{ borderColor: 'var(--bg-secondary)' }}></span>
                                                    </div>
                                                    <div className="overflow-hidden">
                                                        <h3 className="font-bold truncate" style={{ color: 'var(--text-primary)' }}>
                                                            {user?.name}
                                                        </h3>
                                                        <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>
                                                            {user?.email}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="h-px w-full" style={{ backgroundColor: 'var(--border)' }}></div>

                                                {/* Actions Section */}
                                                <div className="p-2">
                                                    <button
                                                        onClick={handleLogout}
                                                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:bg-black/5 dark:hover:bg-white/5"
                                                        style={{ color: 'var(--text-primary)' }}
                                                    >
                                                        <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                        </svg>
                                                        <span className="font-semibold text-sm">Log Out</span>
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            ) : (
                                <div className="hidden md:flex items-center gap-3">
                                    <Link
                                        to="/login"
                                        className="px-5 py-2 rounded-xl text-sm font-bold transition-all duration-300"
                                        style={{ color: 'var(--text-primary)' }}
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="px-6 py-2 rounded-xl text-sm font-bold text-white shadow-md transform transition-all duration-300 hover:scale-105 active:scale-95"
                                        style={{ background: 'var(--accent)' }}
                                    >
                                        Register
                                    </Link>
                                </div>
                            )}

                            {/* Mobile Menu Button */}
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="lg:hidden p-2.5 rounded-xl transition-all duration-300 active:scale-90"
                                style={{
                                    color: 'var(--text-primary)',
                                    backgroundColor: 'var(--bg-tertiary)',
                                    border: '1px solid var(--border)'
                                }}
                                aria-label="Toggle menu"
                            >
                                {mobileMenuOpen ? (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                ) : (
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div
                        className="lg:hidden mt-4 pb-6 space-y-2 animate-in slide-in-from-top-4 duration-300"
                    >
                        <div className="bg-opacity-50 backdrop-blur-sm rounded-2xl p-2" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                            {navLinks.filter(l => l.show).map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 group"
                                    style={{
                                        color: isActive(link.path) ? 'var(--accent)' : 'var(--text-secondary)',
                                        backgroundColor: isActive(link.path) ? 'var(--accent-glow)' : 'transparent'
                                    }}
                                >
                                    <div style={{ color: isActive(link.path) ? 'var(--accent)' : 'inherit' }}>
                                        <NavIcon path={link.path}>{link.icon}</NavIcon>
                                    </div>
                                    {link.label}
                                </Link>
                            ))}

                            {!loggedIn && (
                                <div className="grid grid-cols-2 gap-3 mt-4 p-2">
                                    <Link
                                        to="/login"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="py-3 px-4 rounded-xl text-center text-sm font-bold border"
                                        style={{ borderColor: 'var(--border)', color: 'var(--text-primary)' }}
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="py-3 px-4 rounded-xl text-center text-sm font-bold text-white shadow-lg"
                                        style={{ background: 'var(--accent)' }}
                                    >
                                        Register
                                    </Link>
                                </div>
                            )}

                            {loggedIn && (
                                <div className="mt-4 p-2 pt-0 md:hidden">
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl text-sm font-bold border transition-all duration-300"
                                        style={{
                                            borderColor: 'var(--border)',
                                            color: 'var(--error)',
                                            backgroundColor: 'var(--error-bg)'
                                        }}
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
