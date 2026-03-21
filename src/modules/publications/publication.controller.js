import { syncPublicationsService } from "./publication.service.js";

export const syncPublications = async (req, res) => {
  try {
    const result = await syncPublicationsService();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
