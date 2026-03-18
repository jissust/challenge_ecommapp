const pool = require("./config/db");

async function testConnection() {
    try {
        const [rows] = await pool.query("SELECT 1");
        console.log("Conectado a MySQL")
    } catch (err) {
        console.error("Error conexión", err)
    }
}

testConnection();