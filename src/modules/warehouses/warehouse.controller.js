import { createWarehouseService } from "./warehouse.service.js";

export const createWarehouse = async (req, res) => {
  try {
    const result = await createWarehouseService(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message});
  }
};
