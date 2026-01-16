const app = require("./app");
const logger = require("./utils/logger");

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });
}

module.exports = app;
