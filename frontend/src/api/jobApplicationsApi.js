import api from "./axios";

export const applyJob = (jobId) => {
  return api.post("/job-applications", {
    jobId,
  });
};
