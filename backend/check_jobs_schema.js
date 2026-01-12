import db from "./src/config/db.js";

async function checkSchema() {
    try {
        const [rows] = await db.query("SHOW COLUMNS FROM jobs");
        console.log("Columns in jobs:", rows);
    } catch (error) {
        console.error("Error checking schema:", error.message);
    } finally {
        process.exit();
    }
}

checkSchema();
