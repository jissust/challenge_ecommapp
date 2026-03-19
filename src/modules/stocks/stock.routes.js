import express from "express";
import { assignStock } from "./stock.controller.js";

const router = express.Router();

router.post("/", assignStock);

export default router;