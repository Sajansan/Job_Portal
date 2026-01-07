import pool from "../config/db.js";

// Create Job
export const createJob = async (req, res) => {
  const {
    title,
    description,
    salary,
    category_id,
    company_id,
    location,
    job_type,
  } = req.body;

  // Validate required fields
  const missingFields = [];
  if (!title) missingFields.push("title");
  if (!description) missingFields.push("description");
  if (!category_id) missingFields.push("category_id");
  if (!company_id) missingFields.push("company_id");
  if (!location) missingFields.push("location");
  if (!job_type) missingFields.push("job_type");

  if (missingFields.length > 0) {
    return res.status(400).json({
      error: "Missing required fields",
      missingFields: missingFields,
    });
  }

  try {
    const [result] = await pool.query(
      "INSERT INTO jobs (title, description, salary, category_id, company_id, location, job_type) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [title, description, salary, category_id, company_id, location, job_type]
    );
    res.status(201).json({ message: "Job created", jobId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Jobs
export const getJobs = async (req, res) => {
  try {
    const [jobs] = await pool.query("SELECT * FROM jobs");
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Job
export const updateJob = async (req, res) => {
  const { id } = req.params;
  const { title, description, salary } = req.body;

  try {
    await pool.query(
      "UPDATE jobs SET title=?, description=?, salary=? WHERE id=?",
      [title, description, salary, id]
    );
    res.json({ message: "Job updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Job
export const deleteJob = async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query("DELETE FROM jobs WHERE id=?", [id]);
    res.json({ message: "Job deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
