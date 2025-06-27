import { saveUrl, findUrlByShortcode } from "../models/urlModel.js";
import { generateShortCode } from "../utils/shortCode.js";

// POST /shorturls
export const generateShortUrl = (req, res) => {
  const { url, shortcode, validity } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required." });
  }

  const code = shortcode || generateShortCode();
  const validityMinutes = typeof validity === "number" ? validity : 30;

  try {
    const { shortLink, expiry } = saveUrl(url, code, validityMinutes);
    res.status(201).json({ shortLink, expiry });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET /shorturls/:shortcode
export const getShortUrlDetails = (req, res) => {
  const { shortcode } = req.params;
  const data = findUrlByShortcode(shortcode);

  if (!data) {
    return res.status(404).json({ error: "Shortcode not found." });
  }

  const now = new Date();
  if (now > new Date(data.expiry)) {
    return res.status(410).json({ error: "Short URL has expired." });
  }

  res.json({
    url: data.url,
    createdAt: data.created,
    expiry: data.expiry,
    shortcode: data.shortcode,
  });
};
