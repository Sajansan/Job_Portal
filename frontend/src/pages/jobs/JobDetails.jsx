import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getJobById, deleteJob } from "../../api/JobsApi";
import { applyJob } from "../../api/jobApplicationsApi";
import { getUser } from "../../utils/auth";
import toast from "react-hot-toast";

const JobDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const user = getUser();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [applying, setApplying] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        getJobById(id)
            .then((res) => {
                setJob(res.data);
            })
            .catch((err) => {
                toast.error(err.response?.data?.message || "Failed to load job details");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    const handleApply = async () => {
        if (!user) {
            toast.error("Please login to apply");
            navigate("/login");
            return;
        }
        if (user.role !== "job_seeker") {
            toast.error("Only job seekers can apply");
            return;
        }

        setApplying(true);
        try {
            await applyJob(job.id);
            toast.success("Application submitted successfully!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to apply");
        } finally {
            setApplying(false);
        }
    };

    const handleDelete = async () => {
        setDeleting(true);
        try {
            await deleteJob(job.id);
            toast.success("Job deleted successfully");
            navigate("/my-jobs");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete job");
        } finally {
            setDeleting(false);
            setShowDeleteModal(false);
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
                        <circle
                            className="opacity-25"
                            cx="12" cy="12" r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                    <span style={{ color: 'var(--text-secondary)' }}>Loading job details...</span>
                </div>
            </div>
        );
    }

    if (!job) {
        return (
            <div
                className="min-h-[calc(100vh-120px)] flex flex-col items-center justify-center"
                style={{ backgroundColor: 'var(--bg-primary)' }}
            >
                <h2 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                    Job Not Found
                </h2>
                <Link to="/jobs" className="auth-link">
                    ← Back to Jobs
                </Link>
            </div>
        );
    }

    return (
        <div
            className="min-h-[calc(100vh-120px)] py-8 px-4"
            style={{ backgroundColor: 'var(--bg-primary)' }}
        >
            <div className="max-w-3xl mx-auto">
                {/* Back Link */}
                <Link
                    to="/jobs"
                    className="inline-flex items-center gap-2 mb-6 transition-colors hover:opacity-80"
                    style={{ color: 'var(--accent)' }}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Jobs
                </Link>

                {/* Job Card */}
                <div className="card">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                        <div>
                            <h1
                                className="text-2xl sm:text-3xl font-bold mb-2"
                                style={{ color: 'var(--text-primary)' }}
                            >
                                {job.title}
                            </h1>
                            <p
                                className="text-lg font-medium"
                                style={{ color: 'var(--accent)' }}
                            >
                                {job.company}
                            </p>
                        </div>

                        {/* Salary Badge */}
                        {job.salary && (
                            <div
                                className="px-4 py-2 rounded-lg text-center sm:text-right"
                                style={{ backgroundColor: 'var(--bg-tertiary)' }}
                            >
                                <p className="text-xs uppercase tracking-wide mb-1" style={{ color: 'var(--text-muted)' }}>
                                    Salary
                                </p>
                                <p className="text-lg font-bold" style={{ color: 'var(--success)' }}>
                                    ₹{Number(job.salary).toLocaleString()}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Location */}
                    {job.location && (
                        <div className="flex items-center gap-2 mb-6" style={{ color: 'var(--text-secondary)' }}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>{job.location}</span>
                        </div>
                    )}

                    {/* Description */}
                    <div className="mb-8">
                        <h3
                            className="text-lg font-semibold mb-3"
                            style={{ color: 'var(--text-primary)' }}
                        >
                            Job Description
                        </h3>
                        <div
                            className="p-4 rounded-lg leading-relaxed whitespace-pre-wrap"
                            style={{
                                backgroundColor: 'var(--bg-tertiary)',
                                color: 'var(--text-secondary)'
                            }}
                        >
                            {job.description || "No description provided."}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        {/* Job Seeker: Apply Button */}
                        {user?.role === "job_seeker" && (
                            <button
                                onClick={handleApply}
                                disabled={applying}
                                className="btn-primary flex-1"
                            >
                                {applying ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                        </svg>
                                        Applying...
                                    </span>
                                ) : (
                                    "Apply Now"
                                )}
                            </button>
                        )}

                        {/* Employer: Edit & Delete Buttons */}
                        {user?.role === "employer" && (
                            <>
                                <Link
                                    to={`/jobs/edit/${job.id}`}
                                    className="btn-secondary flex-1 text-center"
                                >
                                    Edit Job
                                </Link>
                                <button
                                    onClick={() => setShowDeleteModal(true)}
                                    className="btn-danger flex-1"
                                >
                                    Delete Job
                                </button>
                            </>
                        )}

                        {/* Not logged in */}
                        {!user && (
                            <Link to="/login" className="btn-primary flex-1 text-center">
                                Login to Apply
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
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
                            Are you sure you want to delete "{job.title}"? This action cannot be undone.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowDeleteModal(false)}
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

export default JobDetails;
