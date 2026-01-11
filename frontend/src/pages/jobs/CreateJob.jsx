import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createJob } from "../../api/JobsApi";
import toast from "react-hot-toast";

const CreateJob = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        location: "",
        salary: "",
        company: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await createJob(formData);
            toast.success("Job created successfully!");
            navigate("/my-jobs");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to create job");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="min-h-[calc(100vh-120px)] py-8 px-4"
            style={{ backgroundColor: 'var(--bg-primary)' }}
        >
            <div className="max-w-2xl mx-auto">
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
                <div className="text-center mb-8">
                    <h1
                        className="text-3xl font-bold mb-2"
                        style={{ color: 'var(--text-primary)' }}
                    >
                        Post a New Job
                    </h1>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        Fill in the details to create a new job listing
                    </p>
                </div>

                {/* Form Card */}
                <div className="card">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Job Title */}
                        <div>
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium mb-2"
                                style={{ color: 'var(--text-secondary)' }}
                            >
                                Job Title *
                            </label>
                            <input
                                id="title"
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g. React Developer"
                                className="form-input"
                                required
                            />
                        </div>

                        {/* Company Name */}
                        <div>
                            <label
                                htmlFor="company"
                                className="block text-sm font-medium mb-2"
                                style={{ color: 'var(--text-secondary)' }}
                            >
                                Company Name *
                            </label>
                            <input
                                id="company"
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                placeholder="e.g. ABC Tech"
                                className="form-input"
                                required
                            />
                        </div>

                        {/* Location */}
                        <div>
                            <label
                                htmlFor="location"
                                className="block text-sm font-medium mb-2"
                                style={{ color: 'var(--text-secondary)' }}
                            >
                                Location *
                            </label>
                            <input
                                id="location"
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="e.g. Colombo"
                                className="form-input"
                                required
                            />
                        </div>

                        {/* Salary */}
                        <div>
                            <label
                                htmlFor="salary"
                                className="block text-sm font-medium mb-2"
                                style={{ color: 'var(--text-secondary)' }}
                            >
                                Salary (Monthly)
                            </label>
                            <input
                                id="salary"
                                type="number"
                                name="salary"
                                value={formData.salary}
                                onChange={handleChange}
                                placeholder="e.g. 100000"
                                className="form-input"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label
                                htmlFor="description"
                                className="block text-sm font-medium mb-2"
                                style={{ color: 'var(--text-secondary)' }}
                            >
                                Job Description *
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Describe the job role, requirements, and responsibilities..."
                                className="form-input min-h-[150px] resize-y"
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary mt-6"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Creating Job...
                                </span>
                            ) : (
                                "Create Job"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateJob;
