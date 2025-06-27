import { saveUrl, findUrlByShortcode } from "../models/urlModel.js";
import { generateShortCode } from "../utils/shortCode.js";

// POST /shorturls
export const generateShortUrl = (req, res) => {
  const { url, shortcode, validityDays } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required." });
  }

  let code = shortcode || generateShortCode();

  try {
    const result = saveUrl(url, code, validityDays);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// GET /shorturls/:shortcode
export const redirectToOriginalUrl = (req, res) => {
  const { shortcode } = req.params;
  const data = findUrlByShortcode(shortcode);

  if (!data) {
    return res.status(404).json({ error: "Shortcode not found." });
  }

  const now = new Date();
  if (now > data.expiry) {
    return res.status(410).json({ error: "Short URL has expired." });
  }

  // sending redirection data, so that frontend can use it to redirect.
  res.status(302).json({
    url: data.url,
    expiresAt: data.expiry,
    message: "Redirect to this URL.",
  });
};
