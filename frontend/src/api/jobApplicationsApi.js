import api from "./axios";

// Apply for a job with cover letter
export const applyJob = (jobId, coverLetter = "") => {
  return api.post("/applications", {
    job_id: jobId,
    cover_letter: coverLetter,
  });
};

// Get my applications (Job Seeker)
export const getMyApplications = () => {
  return api.get("/applications/my");
};

// Get applications for a specific job (Employer)
export const getJobApplications = (jobId) => {
  return api.get(`/applications/job/${jobId}`);
};
