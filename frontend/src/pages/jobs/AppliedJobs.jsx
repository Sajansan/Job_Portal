import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyApplications } from "../../api/jobApplicationsApi";
import toast from "react-hot-toast";

const AppliedJobs = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMyApplications()
            .then((res) => setApplications(res.data))
            .catch(() => toast.error("Failed to load applications"))
            .finally(() => setLoading(false));
    }, []);

    const getStatusStyle = (status) => {
        switch (status?.toLowerCase()) {
            case 'applied':
                return { backgroundColor: 'rgba(99, 102, 241, 0.15)', color: 'var(--accent)' };
            case 'shortlisted':
                return { backgroundColor: 'rgba(234, 179, 8, 0.15)', color: '#eab308' };
            case 'rejected':
                return { backgroundColor: 'var(--error-bg)', color: 'var(--error)' };
            case 'accepted':
                return { backgroundColor: 'rgba(34, 197, 94, 0.15)', color: 'var(--success)' };
            default:
                return { backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-secondary)' };
        }
    };

    if (loading) {
        return (
            <div
                className="min-h-[calc(100vh-120px)] flex items-center justify-center"
                style={{ backgroundColor: 'var(--bg-primary)' }}
            >
                <div className="flex items-center gap-3">
                    <svg className="animate-spin h-8 w-8" style={{ color: 'var(--accent)' }} viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span style={{ color: 'var(--text-secondary)' }}>Loading applications...</span>
                </div>
            </div>
        );
    }

    return (
        <div
            className="min-h-[calc(100vh-120px)] py-8 px-4"
            style={{ backgroundColor: 'var(--bg-primary)' }}
        >
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1
                        className="text-3xl font-bold mb-2"
                        style={{ color: 'var(--text-primary)' }}
                    >
                        My Applications
                    </h1>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        Track the status of your job applications
                    </p>
                </div>

                {/* Applications List */}
                {applications.length === 0 ? (
                    <div className="card text-center py-12">
                        <svg
                            className="w-16 h-16 mx-auto mb-4"
                            style={{ color: 'var(--text-muted)' }}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <h3
                            className="text-xl font-semibold mb-2"
                            style={{ color: 'var(--text-primary)' }}
                        >
                            No Applications Yet
                        </h3>
                        <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
                            Start applying to jobs to see them here
                        </p>
                        <Link to="/jobs" className="auth-link inline-flex items-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            Browse Jobs
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {applications.map((app) => (
                            <div
                                key={app.id}
                                className="card flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                            >
                                <div className="flex-1">
                                    <Link
                                        to={`/jobs/${app.job_id}`}
                                        className="text-lg font-semibold hover:opacity-80 transition-opacity"
                                        style={{ color: 'var(--text-primary)' }}
                                    >
                                        {app.job_title || "Untitled Job"}
                                    </Link>
                                    <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                                        Applied on {new Date(app.applied_at).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>

                                <span
                                    className="px-4 py-2 rounded-full text-sm font-medium capitalize text-center"
                                    style={getStatusStyle(app.status)}
                                >
                                    {app.status || "Applied"}
                                </span>
                            </div>
                        ))}
                    </div>
                )}

                {/* Stats Summary */}
                {applications.length > 0 && (
                    <div
                        className="mt-8 p-4 rounded-lg text-center"
                        style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
                    >
                        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                            Total Applications: <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{applications.length}</span>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AppliedJobs;
