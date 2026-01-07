import db from "../config/db.js";

export const createCompany = async (userId, data) => {
  const { companyName, description, website, location } = data;

  await db.query(
    `INSERT INTO companies (user_id, company_name, description, website, location)
     VALUES (?, ?, ?, ?, ?)`,
    [userId, companyName, description, website, location]
  );
};

export const getCompanyByUserId = async (userId) => {
  const [rows] = await db.query("SELECT * FROM companies WHERE user_id = ?", [
    userId,
  ]);
  return rows[0];
};
