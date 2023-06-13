const { getLogger } = require("./logging");
const { getServer } = require("./server");

module.exports = function () {
  process.setMaxListeners(15);
  process.on("SIGINT", cleanUphandler).on("SIGTERM", cleanUphandler);
};

function cleanUphandler() {
  const logger = getLogger();
  const server = getServer();
  const port = process.env.PORT || 3000;
  server.close(async (err) => {
    if (err) {
      logger.log("error", "Encounter a problem in closing the server.");
      process.exit(1);
    }
    logger.log("info", `The server on port ${port} close safely...`);
    process.exit(0);
  });
}
