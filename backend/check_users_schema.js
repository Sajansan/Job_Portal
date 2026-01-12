import db from "./src/config/db.js";

async function checkSchema() {
    try {
        const [rows] = await db.query("SHOW COLUMNS FROM users");
        console.log("Columns in users:", rows.map(r => r.Field));
        const [categories] = await db.query("SELECT * FROM categories LIMIT 5");
        console.log("Sample categories:", categories);
    } catch (error) {
        console.error("Error checking schema:", error.message);
    } finally {
        process.exit();
    }
}

checkSchema();
