const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 30;

const buckets = new Map(); // ip -> { count, resetAt }

const parentLoginRateLimit = (req, res, next) => {
  const ip = req.ip || req.connection?.remoteAddress || "unknown";
  const now = Date.now();
  const bucket = buckets.get(ip);

  if (!bucket || now > bucket.resetAt) {
    buckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return next();
  }

  bucket.count += 1;
  if (bucket.count > MAX_ATTEMPTS) {
    return res.status(429).json({ message: "Too many login attempts. Try again later." });
  }

  return next();
};

module.exports = parentLoginRateLimit;
