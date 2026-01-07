import db from "../config/db.js";

// Apply for a job (prevent duplicates)
export const applyJobService = async (userId, jobId) => {
  const [existing] = await db.query(
    "SELECT id FROM job_applications WHERE user_id = ? AND job_id = ?",
    [userId, jobId]
  );

  if (existing.length > 0) {
    throw new Error("You have already applied for this job");
  }

  await db.query(
    "INSERT INTO job_applications (user_id, job_id, status) VALUES (?, ?, 'applied')",
    [userId, jobId]
  );
};

// Get applications of a job seeker
export const getMyApplicationsService = async (userId) => {
  const [rows] = await db.query(
    `
    SELECT 
      ja.id,
      ja.status,
      j.title,
      j.salary
    FROM job_applications ja
    JOIN jobs j ON ja.job_id = j.id
    WHERE ja.user_id = ?
    `,
    [userId]
  );

  return rows;
};

// Employer views applicants for a job
export const getApplicantsForJobService = async (jobId) => {
  const [rows] = await db.query(
    `
    SELECT 
      u.id,
      u.name,
      u.email,
      ja.status
    FROM job_applications ja
    JOIN users u ON ja.user_id = u.id
    WHERE ja.job_id = ?
    `,
    [jobId]
  );

  return rows;
};
