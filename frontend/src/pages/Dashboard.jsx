import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUser } from "../utils/auth";
import { getJobs } from "../api/JobsApi";
import { getMyApplications } from "../api/jobApplicationsApi";

const Dashboard = () => {
    const user = getUser();
    const [stats, setStats] = useState({
        totalJobs: 0,
        applications: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const jobsRes = await getJobs();
                setStats(prev => ({ ...prev, totalJobs: jobsRes.data.length }));

                if (user?.role === "job_seeker") {
                    try {
                        const appsRes = await getMyApplications();
                        setStats(prev => ({ ...prev, applications: appsRes.data.length }));
                    } catch {
                        // Applications endpoint might fail if not implemented
                    }
                }
            } catch {
                // Silently fail
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [user?.role]);

    return (
        <div
            className="min-h-[calc(100vh-120px)] py-8 px-4"
            style={{ backgroundColor: 'var(--bg-primary)' }}
        >
            <div className="max-w-5xl mx-auto">
                {/* Welcome Header */}
                <div className="mb-8">
                    <h1
                        className="text-3xl sm:text-4xl font-bold mb-2"
                        style={{ color: 'var(--text-primary)' }}
                    >
                        Welcome back, {user?.name || "User"}!
                    </h1>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        {user?.role === "employer"
                            ? "Manage your job listings and find the best candidates"
                            : "Find your dream job and track your applications"}
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    <div className="card">
                        <div className="flex items-center gap-4">
                            <div
                                className="w-12 h-12 rounded-lg flex items-center justify-center"
                                style={{ backgroundColor: 'var(--accent-glow)' }}
                            >
                                <svg className="w-6 h-6" style={{ color: 'var(--accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                                    {user?.role === "employer" ? "Posted Jobs" : "Available Jobs"}
                                </p>
                                <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                                    {loading ? "..." : stats.totalJobs}
                                </p>
                            </div>
                        </div>
                    </div>

                    {user?.role === "job_seeker" && (
                        <div className="card">
                            <div className="flex items-center gap-4">
                                <div
                                    className="w-12 h-12 rounded-lg flex items-center justify-center"
                                    style={{ backgroundColor: 'rgba(34, 197, 94, 0.15)' }}
                                >
                                    <svg className="w-6 h-6" style={{ color: 'var(--success)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                                        My Applications
                                    </p>
                                    <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                                        {loading ? "..." : stats.applications}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="card">
                        <div className="flex items-center gap-4">
                            <div
                                className="w-12 h-12 rounded-lg flex items-center justify-center"
                                style={{ backgroundColor: user?.role === "employer" ? 'rgba(34, 197, 94, 0.15)' : 'rgba(99, 102, 241, 0.15)' }}
                            >
                                <svg className="w-6 h-6" style={{ color: user?.role === "employer" ? 'var(--success)' : 'var(--accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                                    Role
                                </p>
                                <p className="text-lg font-bold capitalize" style={{ color: 'var(--text-primary)' }}>
                                    {user?.role?.replace('_', ' ') || "User"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="card">
                    <h2
                        className="text-xl font-bold mb-6"
                        style={{ color: 'var(--text-primary)' }}
                    >
                        Quick Actions
                    </h2>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {user?.role === "employer" ? (
                            <>
                                <Link
                                    to="/jobs/create"
                                    className="quick-action-card group"
                                >
                                    <div
                                        className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-colors"
                                        style={{ backgroundColor: 'var(--accent-glow)' }}
                                    >
                                        <svg className="w-5 h-5" style={{ color: 'var(--accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                    </div>
                                    <h3 className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                                        Post New Job
                                    </h3>
                                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                                        Create a new job listing
                                    </p>
                                </Link>

                                <Link
                                    to="/my-jobs"
                                    className="quick-action-card group"
                                >
                                    <div
                                        className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-colors"
                                        style={{ backgroundColor: 'var(--accent-glow)' }}
                                    >
                                        <svg className="w-5 h-5" style={{ color: 'var(--accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                        </svg>
                                    </div>
                                    <h3 className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                                        Manage Jobs
                                    </h3>
                                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                                        View and edit your listings
                                    </p>
                                </Link>

                                <Link
                                    to="/profile"
                                    className="quick-action-card group"
                                >
                                    <div
                                        className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-colors"
                                        style={{ backgroundColor: 'var(--accent-glow)' }}
                                    >
                                        <svg className="w-5 h-5" style={{ color: 'var(--accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <h3 className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                                        My Profile
                                    </h3>
                                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                                        View your account info
                                    </p>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/jobs"
                                    className="quick-action-card group"
                                >
                                    <div
                                        className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-colors"
                                        style={{ backgroundColor: 'var(--accent-glow)' }}
                                    >
                                        <svg className="w-5 h-5" style={{ color: 'var(--accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                                        Browse Jobs
                                    </h3>
                                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                                        Find your perfect role
                                    </p>
                                </Link>

                                <Link
                                    to="/applied-jobs"
                                    className="quick-action-card group"
                                >
                                    <div
                                        className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-colors"
                                        style={{ backgroundColor: 'rgba(34, 197, 94, 0.15)' }}
                                    >
                                        <svg className="w-5 h-5" style={{ color: 'var(--success)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                                        My Applications
                                    </h3>
                                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                                        Track your job applications
                                    </p>
                                </Link>

                                <Link
                                    to="/profile"
                                    className="quick-action-card group"
                                >
                                    <div
                                        className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-colors"
                                        style={{ backgroundColor: 'var(--accent-glow)' }}
                                    >
                                        <svg className="w-5 h-5" style={{ color: 'var(--accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <h3 className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                                        My Profile
                                    </h3>
                                    <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                                        View your account info
                                    </p>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
