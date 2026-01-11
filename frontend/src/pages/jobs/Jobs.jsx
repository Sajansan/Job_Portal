import { useEffect, useState } from "react";
import { getJobs } from "../../api/JobsApi";
import { applyJob } from "../../api/jobApplicationsApi";
import { getUser } from "../../utils/auth";

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const user = getUser();

    useEffect(() => {
        getJobs()
            .then((res) => setJobs(res.data))
            .catch(() => alert("Failed to load jobs"));
    }, []);

    const handleApply = async (jobId) => {
        if (user.role !== "job_seeker") {
            alert("Only job seekers can apply");
            return;
        }

        try {
            await applyJob(jobId);
            alert("Job applied successfully");
        } catch (error) {
            alert(error.response?.data?.message || "Apply failed");
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Available Jobs</h1>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.map((job) => (
                    <div
                        key={job.id}
                        className="bg-gray-800 p-5 rounded-xl shadow flex flex-col justify-between"
                    >
                        <div>
                            <h2 className="text-xl font-semibold">{job.title}</h2>
                            <p className="text-gray-400 mt-2">{job.description}</p>
                            <p className="text-sm text-gray-500 mt-4">
                                Category: {job.category_name}
                            </p>
                        </div>

                        {user?.role === "job_seeker" && (
                            <button
                                onClick={() => handleApply(job.id)}
                                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
                            >
                                Apply
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Jobs;
