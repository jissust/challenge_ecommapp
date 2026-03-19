import express from "express";

import warehouseRoutes from "../modules/warehouses/warehouse.routes.js";
import productRoutes from "../modules/products/product.routes.js"

const router = express.Router();

router.use("/warehouses", warehouseRoutes);
router.use("/products", productRoutes)

export default router;
