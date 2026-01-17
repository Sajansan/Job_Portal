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
    const [jobs] = await pool.query(`
      SELECT j.*, c.company_name as company 
      FROM jobs j
      LEFT JOIN companies c ON j.company_id = c.id
    `);
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get My Jobs (for employer)
export const getMyJobs = async (req, res) => {
  try {
    // 1. Get company_id for this user
    const [companies] = await pool.query(
      "SELECT id FROM companies WHERE user_id = ?",
      [req.user.id]
    );

    if (companies.length === 0) {
      return res.status(404).json({ message: "Company profile not found" });
    }

    const companyId = companies[0].id;

    // 2. Get jobs for this company
    const [jobs] = await pool.query(
      `SELECT j.*, c.company_name as company 
       FROM jobs j
       JOIN companies c ON j.company_id = c.id
       WHERE j.company_id = ?`,
      [companyId]
    );

    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Single Job
export const getJobById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query("SELECT * FROM jobs WHERE id = ?", [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.json(rows[0]);
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

