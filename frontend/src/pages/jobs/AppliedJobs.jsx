import { useEffect, useState } from "react";
import { getMyApplications } from "../../api/jobApplicationsApi";

const statusStyles = {
    applied: "bg-blue-500/20 text-blue-400",
    shortlisted: "bg-yellow-500/20 text-yellow-400",
    rejected: "bg-red-500/20 text-red-400",
};

const AppliedJobs = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMyApplications()
            .then((res) => setApplications(res.data))
            .catch(() => alert("Failed to load applications"))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <p className="p-6">Loading...</p>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">My Applications</h1>

            {applications.length === 0 ? (
                <p className="text-gray-400">You haven’t applied to any jobs yet.</p>
            ) : (
                <div className="space-y-4">
                    {applications.map((app) => (
                        <div
                            key={app.id}
                            className="bg-gray-800 p-5 rounded-lg flex justify-between items-center"
                        >
                            <div>
                                <h2 className="text-lg font-semibold">{app.job_title}</h2>
                                <p className="text-sm text-gray-400">
                                    Applied on {new Date(app.applied_at).toLocaleDateString()}
                                </p>
                            </div>

                            <span
                                className={`px-3 py-1 rounded-full text-sm capitalize ${statusStyles[app.status]}`}
                            >
                                {app.status}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AppliedJobs;
