const setRateLimit = require("express-rate-limit");

// Rate limit middleware
const rateLimitMiddleware = setRateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  //max: 5, Limit each IP to 5 requests per `window` (here, per 1 minutes).
  // or
  limit:5,
  message: "You have exceeded your 5 requests per minute limit.",
  headers: true,
});

module.exports = rateLimitMiddleware;