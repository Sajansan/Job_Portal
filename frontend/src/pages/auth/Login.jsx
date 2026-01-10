const Login = () => {
    return (
        <div className="max-w-md mx-auto bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">
                Login
            </h2>

            <form className="space-y-4">
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <button className="w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded-md transition">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
