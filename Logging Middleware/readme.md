Logging Middleware

This is a simple logging middleware for Express.js.

Usage:

- Copy logger.js file to main project (in Backend Test Submission)
- In the Express app file (e.g. index.js), add:
  "
  const { logger } = require("./logger");
  app.use(logger);
  " -> so this part already exists there.

(Although i also added in the middlewares folder in the main one, so that i can see it in action and that part runs standalone).

What this does:

- Logs every request's method, URL, status code, and response time in terminal.
