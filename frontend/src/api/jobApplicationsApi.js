import api from "./axios";

export const applyJob = (jobId) => {
  return api.post("/job-applications", {
    jobId,
  });
};

export const getMyApplications = () => {
  return api.get("/job-applications/my");
};
