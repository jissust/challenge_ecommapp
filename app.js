import express from "express";
import { pool } from  "./src/database/config/db.js";

const app = express();

app.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1");
    res.json({ ok: true, db: "connected" });
  } catch (error) {
    res.status(500).json({ error: "DB error" });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});