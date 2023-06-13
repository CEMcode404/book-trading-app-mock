const express = require("express");
const { getLogger } = require("./logging");

let server;

function createServer(PORT, callback) {
  const app = express();
  server = app.listen(PORT, () =>
    getLogger().log("info", `Listening on port ${PORT}...`)
  );
  callback(app);
}

function getServer() {
  return server;
}

module.exports = { createServer, getServer };
