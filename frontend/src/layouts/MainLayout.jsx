import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => {
    return (
        <div
            className="min-h-screen flex flex-col"
            style={{ backgroundColor: 'var(--bg-primary)' }}
        >
            <Navbar />
            <main className="flex-1">
                <Outlet />
            </main>

            {/* Footer */}
            <footer
                className="border-t py-6 px-4"
                style={{
                    backgroundColor: 'var(--bg-secondary)',
                    borderColor: 'var(--border)'
                }}
            >
                <div className="container mx-auto text-center">
                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                        © {new Date().getFullYear()} Job Portal. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default MainLayout;