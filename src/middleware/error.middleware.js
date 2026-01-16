const logger = require("../utils/logger");
module.exports = (err, req, res, next) => {
  logger.error(err.message || "Unhandled error");
  res.status(500).json({ message: "Internal server error" });
};
