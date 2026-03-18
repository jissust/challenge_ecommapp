const fs = require("fs");
const path = require("path");
const pool = require("./config/db");

async function runMigration() {
  try {
    console.log("Iniciando migración...");

    const filePath = path.join(__dirname, "/init/01-init.sql");

    const sql = fs.readFileSync(filePath, "utf8");

    console.log("Ejecutando script SQL...");

    await pool.query(sql);

    console.log("Migración ejecutada correctamente");

    process.exit(0);
  } catch (error) {
    console.error("Error en migración:", error);
    process.exit(1);
  }
}

runMigration();