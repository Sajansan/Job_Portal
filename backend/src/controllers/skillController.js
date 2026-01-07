import pool from "../config/db.js";

export const getSkills = async (req, res) => {
  try {
    const [skills] = await pool.query("SELECT * FROM skills");
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createSkill = async (req, res) => {
  const { name } = req.body;

  try {
    await pool.query("INSERT INTO skills (name) VALUES (?)", [name]);
    res.status(201).json({ message: "Skill created" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
