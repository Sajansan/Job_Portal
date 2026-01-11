import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getJobById } from "../../api/JobsApi";
import { getJobApplications } from "../../api/jobApplicationsApi";
import toast from "react-hot-toast";

const JobApplicants = () => {
    const { jobId } = useParams();
    const [job, setJob] = useState(null);
    const [applicants, setApplicants] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [jobRes, applicantsRes] = await Promise.all([
                    getJobById(jobId),
                    getJobApplications(jobId)
                ]);
                setJob(jobRes.data);
                setApplicants(applicantsRes.data);
            } catch (error) {
                toast.error(error.response?.data?.message || "Failed to load applicants");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [jobId]);

    const getStatusStyle = (status) => {
        switch (status?.toLowerCase()) {
            case 'pending':
                return { backgroundColor: 'rgba(234, 179, 8, 0.15)', color: '#eab308' };
            case 'shortlisted':
                return { backgroundColor: 'rgba(99, 102, 241, 0.15)', color: 'var(--accent)' };
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
                    <span style={{ color: 'var(--text-secondary)' }}>Loading applicants...</span>
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
                {/* Back Link */}
                <Link
                    to="/my-jobs"
                    className="inline-flex items-center gap-2 mb-6 transition-colors hover:opacity-80"
                    style={{ color: 'var(--accent)' }}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to My Jobs
                </Link>

                {/* Header */}
                <div className="mb-8">
                    <h1
                        className="text-3xl font-bold mb-2"
                        style={{ color: 'var(--text-primary)' }}
                    >
                        Applicants
                    </h1>
                    {job && (
                        <p style={{ color: 'var(--text-secondary)' }}>
                            for <span style={{ color: 'var(--accent)', fontWeight: 600 }}>{job.title}</span>
                            {job.company && ` at ${job.company}`}
                        </p>
                    )}
                </div>

                {/* Applicants List */}
                {applicants.length === 0 ? (
                    <div className="card text-center py-12">
                        <svg
                            className="w-16 h-16 mx-auto mb-4"
                            style={{ color: 'var(--text-muted)' }}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <h3
                            className="text-xl font-semibold mb-2"
                            style={{ color: 'var(--text-primary)' }}
                        >
                            No Applicants Yet
                        </h3>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            No one has applied for this job yet. Check back later!
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {applicants.map((applicant, index) => (
                            <div
                                key={index}
                                className="card flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                            >
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        {/* Avatar */}
                                        <div
                                            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm"
                                            style={{ background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%)' }}
                                        >
                                            {applicant.applicant_name?.charAt(0)?.toUpperCase() || 'A'}
                                        </div>
                                        <div>
                                            <h3
                                                className="font-semibold"
                                                style={{ color: 'var(--text-primary)' }}
                                            >
                                                {applicant.applicant_name || "Unknown Applicant"}
                                            </h3>
                                            <p
                                                className="text-sm"
                                                style={{ color: 'var(--text-muted)' }}
                                            >
                                                {applicant.email || "No email provided"}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <span
                                    className="px-4 py-2 rounded-full text-sm font-medium capitalize text-center"
                                    style={getStatusStyle(applicant.status)}
                                >
                                    {applicant.status || "pending"}
                                </span>
                            </div>
                        ))}
                    </div>
                )}

                {/* Stats Summary */}
                {applicants.length > 0 && (
                    <div
                        className="mt-8 p-4 rounded-lg text-center"
                        style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
                    >
                        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                            Total Applicants: <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>{applicants.length}</span>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobApplicants;
