import { useEffect, useState } from "react";
import { getJobs } from "../../api/JobsApi";

const Jobs = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        getJobs()
            .then((res) => setJobs(res.data))
            .catch(() => alert("Failed to load jobs"));
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Available Jobs</h1>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.map((job) => (
                    <div
                        key={job.id}
                        className="bg-gray-800 p-5 rounded-xl shadow"
                    >
                        <h2 className="text-xl font-semibold">{job.title}</h2>
                        <p className="text-gray-400 mt-2">{job.description}</p>

                        <p className="text-sm text-gray-500 mt-4">
                            Category: {job.category_name}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Jobs;
