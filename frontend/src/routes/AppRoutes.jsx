import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "../components/ProtectedRoute";
import Jobs from "../pages/jobs/Jobs";
import JobDetails from "../pages/jobs/JobDetails";
import CreateJob from "../pages/jobs/CreateJob";
import EditJob from "../pages/jobs/EditJob";
import MyJobs from "../pages/jobs/MyJobs";
import AppliedJobs from "../pages/jobs/AppliedJobs";
import Profile from "../pages/Profile";

const AppRoutes = () => {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                {/* Public Routes */}
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/jobs/:id" element={<JobDetails />} />

                {/* Protected Routes */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/applied-jobs"
                    element={
                        <ProtectedRoute>
                            <AppliedJobs />
                        </ProtectedRoute>
                    }
                />

                {/* Employer Routes */}
                <Route
                    path="/jobs/create"
                    element={
                        <ProtectedRoute>
                            <CreateJob />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/jobs/edit/:id"
                    element={
                        <ProtectedRoute>
                            <EditJob />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/my-jobs"
                    element={
                        <ProtectedRoute>
                            <MyJobs />
                        </ProtectedRoute>
                    }
                />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
