import express from "express";
import { getRandomQuote } from "../controllers/quoteControllers.mjs";

const router = express.Router();
router.get("/random", getRandomQuote);

export default router;
