import fs from "fs";
import { pool } from "../../database/config/db.js";

export const syncPublicationsService = async () => {
  const data = JSON.parse(
    fs.readFileSync("mock-channel-api/data/publications.json", "utf-8"),
  );

  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    for (const pub of data) {
      const [result] = await conn.query(
        "INSERT INTO publications (external_id, channel) VALUES (?, ?)",
        [pub.id, pub.channel],
      );

      const publicationId = result.insertId;

      for (const variant of pub.variants) {
        await conn.query(
          `
          INSERT INTO publication_variants (publication_id, sku, external_variant_id)
          VALUES (?, ?, ?)
        `,
          [publicationId, variant.sku, variant.id],
        );
      }
    }

    await conn.commit();
  } catch (error) {
    await conn.rollback();
    throw error;
  } finally {
    conn.release();
  }
};
