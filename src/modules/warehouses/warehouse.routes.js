import express from "express";
import { createWarehouse } from "./warehouse.controller.js";

const router = express.Router();

router.post("/", createWarehouse);

export default router;