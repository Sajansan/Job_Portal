import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getJobs, deleteJob } from "../../api/JobsApi";
import toast from "react-hot-toast";

const MyJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteJobId, setDeleteJobId] = useState(null);
    const [deleting, setDeleting] = useState(false);

    const fetchJobs = () => {
        getJobs()
            .then((res) => {
                // Filter to show only jobs posted by the current employer
                // Note: In a real app, backend should have an endpoint for employer's jobs
                setJobs(res.data);
            })
            .catch(() => {
                toast.error("Failed to load jobs");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const handleDelete = async () => {
        if (!deleteJobId) return;

        setDeleting(true);
        try {
            await deleteJob(deleteJobId);
            toast.success("Job deleted successfully");
            setJobs(jobs.filter(job => job.id !== deleteJobId));
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete job");
        } finally {
            setDeleting(false);
            setDeleteJobId(null);
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
                    <span style={{ color: 'var(--text-secondary)' }}>Loading your jobs...</span>
                </div>
            </div>
        );
    }

    return (
        <div
            className="min-h-[calc(100vh-120px)] py-8 px-4"
            style={{ backgroundColor: 'var(--bg-primary)' }}
        >
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div>
                        <h1
                            className="text-3xl font-bold mb-2"
                            style={{ color: 'var(--text-primary)' }}
                        >
                            My Job Listings
                        </h1>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            Manage your posted jobs
                        </p>
                    </div>
                    <Link
                        to="/jobs/create"
                        className="btn-primary inline-flex items-center justify-center gap-2 w-full sm:w-auto"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Post New Job
                    </Link>
                </div>

                {/* Jobs List */}
                {jobs.length === 0 ? (
                    <div
                        className="card text-center py-12"
                    >
                        <svg
                            className="w-16 h-16 mx-auto mb-4"
                            style={{ color: 'var(--text-muted)' }}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <h3
                            className="text-xl font-semibold mb-2"
                            style={{ color: 'var(--text-primary)' }}
                        >
                            No Jobs Posted Yet
                        </h3>
                        <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
                            Start by posting your first job listing
                        </p>
                        <Link
                            to="/jobs/create"
                            className="auth-link inline-flex items-center gap-2"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Post Your First Job
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {jobs.map((job) => (
                            <div
                                key={job.id}
                                className="card flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                            >
                                <div className="flex-1">
                                    <Link
                                        to={`/jobs/${job.id}`}
                                        className="text-xl font-semibold hover:opacity-80 transition-opacity"
                                        style={{ color: 'var(--text-primary)' }}
                                    >
                                        {job.title}
                                    </Link>
                                    <div className="flex flex-wrap gap-3 mt-2">
                                        {job.company && (
                                            <span
                                                className="text-sm"
                                                style={{ color: 'var(--accent)' }}
                                            >
                                                {job.company}
                                            </span>
                                        )}
                                        {job.location && (
                                            <span
                                                className="text-sm flex items-center gap-1"
                                                style={{ color: 'var(--text-secondary)' }}
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                </svg>
                                                {job.location}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <Link
                                        to={`/jobs/${job.id}`}
                                        className="btn-secondary-sm"
                                    >
                                        View
                                    </Link>
                                    <Link
                                        to={`/jobs/edit/${job.id}`}
                                        className="btn-secondary-sm"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => setDeleteJobId(job.id)}
                                        className="btn-danger-sm"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Delete Confirmation Modal */}
            {deleteJobId && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
                >
                    <div
                        className="w-full max-w-md rounded-xl p-6"
                        style={{
                            backgroundColor: 'var(--bg-secondary)',
                            border: '1px solid var(--border)'
                        }}
                    >
                        <h3
                            className="text-xl font-bold mb-4"
                            style={{ color: 'var(--text-primary)' }}
                        >
                            Confirm Delete
                        </h3>
                        <p className="mb-6" style={{ color: 'var(--text-secondary)' }}>
                            Are you sure you want to delete this job? This action cannot be undone.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setDeleteJobId(null)}
                                className="btn-secondary flex-1"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={deleting}
                                className="btn-danger flex-1"
                            >
                                {deleting ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyJobs;
