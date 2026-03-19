import express from "express";

import warehouseRoutes from "../modules/warehouses/warehouse.routes.js";

const router = express.Router();

router.use("/warehouses", warehouseRoutes);

export default router;
