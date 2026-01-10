const Register = () => {
    return (
        <div className="max-w-md mx-auto bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">
                Register
            </h2>

            <form className="space-y-4">
                <input
                    type="text"
                    placeholder="Name"
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md"
                />

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md"
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md"
                />

                <button className="w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded-md transition">
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;
