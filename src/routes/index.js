import express from "express";

import warehouseRoutes from "../modules/warehouses/warehouse.routes.js";
import productRoutes from "../modules/products/product.routes.js"
import stockRoutes from "../modules/stocks/stock.routes.js"

const router = express.Router();

router.use("/warehouses", warehouseRoutes);
router.use("/products", productRoutes);
router.use("/stocks", stockRoutes);

export default router;
