import db from "./src/config/db.js";

async function checkData() {
    try {
        const [companies] = await db.query("SELECT * FROM companies");
        console.log("Companies:", companies);
        const [categories] = await db.query("SELECT * FROM job_categories");
        console.log("Categories:", categories);
    } catch (error) {
        console.error("Error checking data:", error.message);
    } finally {
        process.exit();
    }
}

checkData();
