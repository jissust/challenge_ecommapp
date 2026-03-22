import { Worker } from "bullmq";
import axios from "axios";
import { pool } from "../../src/database/config/db.js";

const worker = new Worker(
  "stock",
  async (job) => {
    if (job.name === "sync-stock") {
      const { variant_id, totalStock } = job.data;

      const [variant] = await pool.query(
        "SELECT sku FROM variants WHERE id = ?",
        [variant_id],
      );

      const sku = variant[0].sku;

      const [rows] = await pool.query(
        `
        SELECT 
            p.id, 
            p.external_id,
            pv.external_variant_id 
        FROM 
            publication_variants pv JOIN publications p 
        ON
            p.id = pv.publication_id
        WHERE
            pv.sku = ?
        `,
        [sku],
      );

      console.log("Procesando sync:", job.data);

      for (const row of rows) {
        try {
          await axios.put(
            `http://mock-channel-api:8080/channel/publications/${row.external_id}/variants/${row.external_variant_id}/stock`,
            {
              stock: Number(totalStock),
            },
          );

          console.log("Stock sincronizado");
        } catch (error) {
          console.error("Error sync:", error.message);
          throw error;
        }
      }
    }
  },
  {
    connection: {
      host: "redis",
      port: 6379,
    },
  },
);

// logs
worker.on("completed", (job) => {
  console.log(`Job ${job.id} completado`);
});

worker.on("failed", (job, err) => {
  console.error(`Job ${job.id} falló`, err.message);
});
