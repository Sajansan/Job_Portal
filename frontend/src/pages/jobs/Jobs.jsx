import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getJobs } from "../../api/JobsApi";
import { applyJob } from "../../api/jobApplicationsApi";
import { getUser } from "../../utils/auth";
import toast from "react-hot-toast";

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [applyingId, setApplyingId] = useState(null);
    const user = getUser();

    useEffect(() => {
        getJobs()
            .then((res) => {
                setJobs(res.data);
                setFilteredJobs(res.data);
            })
            .catch(() => {
                toast.error("Failed to load jobs");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        const filtered = jobs.filter(job =>
            job.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.location?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredJobs(filtered);
    }, [searchTerm, jobs]);

    const handleApply = async (jobId) => {
        if (!user) {
            toast.error("Please login to apply");
            return;
        }
        if (user.role !== "job_seeker") {
            toast.error("Only job seekers can apply");
            return;
        }

        setApplyingId(jobId);
        try {
            await applyJob(jobId);
            toast.success("Application submitted successfully!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to apply");
        } finally {
            setApplyingId(null);
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
                    <span style={{ color: 'var(--text-secondary)' }}>Loading jobs...</span>
                </div>
            </div>
        );
    }

    return (
        <div
            className="min-h-[calc(100vh-120px)] py-8 px-4"
            style={{ backgroundColor: 'var(--bg-primary)' }}
        >
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1
                        className="text-3xl sm:text-4xl font-bold mb-2"
                        style={{ color: 'var(--text-primary)' }}
                    >
                        Available Jobs
                    </h1>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        Discover your next career opportunity
                    </p>
                </div>

                {/* Search Bar */}
                <div className="mb-8">
                    <div className="relative max-w-xl mx-auto">
                        <svg
                            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
                            style={{ color: 'var(--text-muted)' }}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search jobs by title, company, or location..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="form-input pl-12"
                        />
                    </div>
                </div>

                {/* Jobs Count */}
                <p className="mb-6 text-sm" style={{ color: 'var(--text-muted)' }}>
                    Showing {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'}
                    {searchTerm && ` for "${searchTerm}"`}
                </p>

                {/* Jobs Grid */}
                {filteredJobs.length === 0 ? (
                    <div className="card text-center py-12">
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
                            No Jobs Found
                        </h3>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            {searchTerm ? "Try adjusting your search terms" : "Check back later for new opportunities"}
                        </p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredJobs.map((job) => (
                            <div
                                key={job.id}
                                className="card flex flex-col hover:shadow-lg transition-shadow"
                            >
                                <div className="flex-1">
                                    <Link
                                        to={`/jobs/${job.id}`}
                                        className="text-xl font-semibold hover:opacity-80 transition-opacity block mb-2"
                                        style={{ color: 'var(--text-primary)' }}
                                    >
                                        {job.title}
                                    </Link>

                                    {job.company && (
                                        <p
                                            className="font-medium mb-3"
                                            style={{ color: 'var(--accent)' }}
                                        >
                                            {job.company}
                                        </p>
                                    )}

                                    <p
                                        className="text-sm line-clamp-2 mb-4"
                                        style={{ color: 'var(--text-secondary)' }}
                                    >
                                        {job.description || "No description available"}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {job.location && (
                                            <span
                                                className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full"
                                                style={{
                                                    backgroundColor: 'var(--bg-tertiary)',
                                                    color: 'var(--text-secondary)'
                                                }}
                                            >
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                </svg>
                                                {job.location}
                                            </span>
                                        )}
                                        {job.category_name && (
                                            <span
                                                className="text-xs px-2 py-1 rounded-full"
                                                style={{
                                                    backgroundColor: 'var(--accent-glow)',
                                                    color: 'var(--accent)'
                                                }}
                                            >
                                                {job.category_name}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="flex gap-2 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
                                    <Link
                                        to={`/jobs/${job.id}`}
                                        className="btn-secondary flex-1 text-center text-sm"
                                    >
                                        View Details
                                    </Link>
                                    {user?.role === "job_seeker" && (
                                        <button
                                            onClick={() => handleApply(job.id)}
                                            disabled={applyingId === job.id}
                                            className="btn-primary flex-1 text-sm"
                                        >
                                            {applyingId === job.id ? "Applying..." : "Apply"}
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Jobs;
