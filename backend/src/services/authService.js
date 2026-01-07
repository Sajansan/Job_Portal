import db from "../config/db.js";
import { hashPassword, comparePassword } from "../utils/passwordUtils.js";

export const createUser = async (userData) => {
  const { name, email, password, role, phone } = userData;

  const hashedPassword = await hashPassword(password);

  const [result] = await db.query(
    `INSERT INTO users (name, email, password, role, phone)
     VALUES (?, ?, ?, ?, ?)`,
    [name, email, hashedPassword, role, phone]
  );

  return result.insertId;
};

export const findUserByEmail = async (email) => {
  const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);

  return rows[0];
};

export const validatePassword = async (password, hashedPassword) => {
  return await comparePassword(password, hashedPassword);
};
