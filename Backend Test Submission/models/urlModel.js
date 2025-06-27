const urlDatabase = new Map();

export function saveUrl(url, shortcode, validity = 30) {
  if (urlDatabase.has(shortcode)) {
    throw new Error("Shortcode already in use.");
  }
  const now = new Date();
  const expiry = new Date(now.getTime() + validity * 60 * 1000);

  const urlData = {
    url,
    shortcode,
    created: now.toISOString(),
    expiry: expiry.toISOString(),
  };
  urlDatabase.set(shortcode, urlData);
  return {
    shortLink: `http://localhost:3000/${shortcode}`,
    expiry: expiry.toISOString(),
  };
}

export function findUrlByShortcode(shortcode) {
  return urlDatabase.get(shortcode) || null;
}
