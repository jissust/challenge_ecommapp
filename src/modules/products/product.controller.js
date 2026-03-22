import { createProductService } from "./product.service.js";

export const createProduct = async (req, res) => {
  try {
    const result = await createProductService(req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
