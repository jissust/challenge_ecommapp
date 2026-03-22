import express from "express";
import { syncPublications } from "./publication.controller.js";

const router = express.Router();

router.post("/sync", syncPublications);

export default router;
