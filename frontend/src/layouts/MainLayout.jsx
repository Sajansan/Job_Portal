import { Outlet, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getUser } from "../utils/auth";

const MainLayout = () => {
    const user = getUser();

    return (
        <div
            className="min-h-screen flex flex-col"
            style={{ backgroundColor: 'var(--bg-primary)' }}
        >
            <Navbar />

            {user?.role === "job_seeker" && (
                <div
                    className="container mx-auto px-4 py-2"
                    style={{ borderBottom: '1px solid var(--border)' }}
                >
                    <Link
                        to="/applied-jobs"
                        className="text-sm font-medium transition-colors hover:opacity-80"
                        style={{ color: 'var(--accent)' }}
                    >
                        My Applications
                    </Link>
                </div>
            )}

            <main className="flex-1 container mx-auto px-4 py-6">
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;