import express from "express";

import warehouseRoutes from "../modules/warehouses/warehouse.routes.js";
import productRoutes from "../modules/products/product.routes.js"
import stockRoutes from "../modules/stocks/stock.routes.js"
import variantRoutes from "../modules/variants/variant.routes.js"
import publicationRoutes from "../modules/publications/publication.routes.js";

const router = express.Router();

router.use("/warehouses", warehouseRoutes);
router.use("/products", productRoutes);
router.use("/stocks", stockRoutes);
router.use("/variants", variantRoutes);
router.use("/publications", publicationRoutes);

export default router;
