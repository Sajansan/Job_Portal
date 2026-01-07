import db from "./config/db.js";

async function testConnection() {
  try {
    const [rows] = await db.query("SELECT 1 + 1 AS result");
    console.log("DB Connected Successfully:", rows[0].result); // Should print 2
  } catch (err) {
    console.error("DB Connection Failed:", err);
  }
}

testConnection();
