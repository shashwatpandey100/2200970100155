const axios = require("axios");

async function logToTestServer(stack, level, pkg, message) {
  try {
    await axios.post("http://20.244.56.144/evaluation-service/logs", {
      stack,
      level,
      package: pkg,
      message,
    });
  } catch (err) {}
}

function logger(req, res, next) {
  const start = Date.now();
  res.on("finish", () => {
    const elapsed = Date.now() - start;
    logToTestServer(
      "backend",
      "info",
      "middleware",
      `${req.method} ${req.originalUrl} ${res.statusCode} - ${elapsed}ms`
    );
  });
  next();
}

module.exports = { logger, logToTestServer };
