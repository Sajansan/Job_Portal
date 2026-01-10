import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "../components/ProtectedRoute";

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                {/* Public Routes */}
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Protected Routes */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
