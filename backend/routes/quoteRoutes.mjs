import express from "express";
import {
  getRandomQuote,
  getAllQuotes,
} from "../controllers/quoteControllers.mjs";

const router = express.Router();

router.get("/random", getRandomQuote);
router.get("/", getAllQuotes);

export default router;
