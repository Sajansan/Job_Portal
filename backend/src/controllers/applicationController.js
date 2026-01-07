import {
  applyJobService,
  getMyApplicationsService,
  getApplicantsForJobService,
} from "../services/applicationService.js";

// Job seeker applies for job
export const applyForJob = async (req, res) => {
  try {
    const userId = req.user.id;
    const jobId = req.params.jobId;

    await applyJobService(userId, jobId);

    res.status(201).json({ message: "Job applied successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Job seeker views own applications
export const getMyApplications = async (req, res) => {
  try {
    const userId = req.user.id;

    const applications = await getMyApplicationsService(userId);

    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Employer views applicants for a job
export const getApplicantsForJob = async (req, res) => {
  try {
    const jobId = req.params.jobId;

    const applicants = await getApplicantsForJobService(jobId);

    res.json(applicants);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
