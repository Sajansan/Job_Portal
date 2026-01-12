import db from "./src/config/db.js";

async function listTables() {
    try {
        const [rows] = await db.query("SHOW TABLES");
        console.log("Tables:", rows);
    } catch (error) {
        console.error("Error listing tables:", error.message);
    } finally {
        process.exit();
    }
}

listTables();
