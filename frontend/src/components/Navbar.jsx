import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
    return (
        <nav
            className="border-b backdrop-blur-sm sticky top-0 z-50"
            style={{
                backgroundColor: 'var(--bg-secondary)',
                borderColor: 'var(--border)',
            }}
        >
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 group">
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

                <div className="flex items-center gap-4">
                    <ThemeToggle />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
