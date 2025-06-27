const urlDatabase = new Map();

export function saveUrl(url, shortcode, validityDays = 7) {
  if (urlDatabase.has(shortcode)) {
    throw new Error("Shortcode already in use.");
  }
  const now = new Date();
  const expiry = new Date(
    now.getTime() + (validityDays || 7) * 24 * 60 * 60 * 1000
  );

  const urlData = {
    url,
    shortcode,
    created: now,
    expiry,
  };
  urlDatabase.set(shortcode, urlData);
  return urlData;
}

export function findUrlByShortcode(shortcode) {
  return urlDatabase.get(shortcode) || null;
}
