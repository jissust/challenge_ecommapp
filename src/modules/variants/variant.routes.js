import express from "express";
import { updateStockWarehouse } from "./variant.controller.js";

const router = express.Router();
router.put("/:id/stock", updateStockWarehouse);

export default router;