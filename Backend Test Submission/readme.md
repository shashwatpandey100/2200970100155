URL Shortener Microservice

This is a simple Express URL shortener.

Usage:

- npm install
- node index.js
- The service runs on port 3000 (or add a port in env for custom port)

Endpoints:
POST /shorturls

- Body: { "url": "<original_url>", "shortcode": "<optional_custom_code>", "validityDays": <optional_days> }
- Returns: Shortened URL data

GET /shorturls/:shortcode

- Gives Redirection data for original URL if the code exists and is not expired

Folders:

- routes
- controllers
- models
- utils
- middlewares

-(Shortcodes are randomly generated if not provided)
-(Logging is done for every request)
