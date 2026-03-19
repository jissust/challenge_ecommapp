
import { assignStockService } from "./stock.service.js";

export const assignStock = async (req, res) => {
  try {
    const result = await assignStockService(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};