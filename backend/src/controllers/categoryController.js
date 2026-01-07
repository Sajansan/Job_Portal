import pool from "../config/db.js";

export const getCategories = async (req, res) => {
  try {
    const [job_categories] = await pool.query("SELECT * FROM job_categories");
    res.json(job_categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createCategory = async (req, res) => {
  const { name } = req.body;

  try {
    await pool.query("INSERT INTO job_categories (name) VALUES (?)", [name]);
    res.status(201).json({ message: "Category created" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
