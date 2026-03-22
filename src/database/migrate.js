import fs from "fs";
import path from "path";
import { pool } from "./config/db.js";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
