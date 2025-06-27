import express from "express";
import {
  generateShortUrl,
  getShortUrlDetails,
} from "../controllers/urlController.js";

const router = express.Router();

router.post("/", generateShortUrl);
router.get("/:shortcode", getShortUrlDetails);

export default router;
