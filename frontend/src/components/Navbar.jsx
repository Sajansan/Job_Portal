import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="bg-gray-800 border-b border-gray-700">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <h1 className="text-xl font-bold text-indigo-400">
                    Job Portal
                </h1>

                <div className="space-x-4">
                    <Link
                        to="/login"
                        className="text-gray-300 hover:text-white transition"
                    >
                        Login
                    </Link>
                    <Link
                        to="/register"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition"
                    >
                        Register
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

