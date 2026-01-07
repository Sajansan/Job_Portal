import db from "../config/db.js";

export const getUserById = async (userId) => {
  const [rows] = await db.query(
    "SELECT id, name, email, role, phone, resume FROM users WHERE id = ?",
    [userId]
  );
  return rows[0];
};

export const updateUserProfile = async (userId, data) => {
  const { name, phone, role } = data;

  await db.query(
    "UPDATE users SET name = ?, phone = ?, role = ? WHERE id = ?", //I allow the user to update their role temporarily for testing purposes
    [name, phone, role, userId]
  );
};
