import { Outlet, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getUser } from "../utils/auth";

const MainLayout = () => {
    const user = getUser();

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            {user?.role === "job_seeker" && (
                <Link to="/applied-jobs">My Applications</Link>
            )}

            <main className="flex-1 container mx-auto px-4 py-6">
                <Outlet />
            </main>

        </div>

    );
};

export default MainLayout;