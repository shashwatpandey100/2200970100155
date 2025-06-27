import express from "express";
import {
  generateShortUrl,
  redirectToOriginalUrl,
} from "../controllers/urlController.js";

const router = express.Router();

router.post("/", generateShortUrl);

router.get("/:shortcode", redirectToOriginalUrl);

export default router;
