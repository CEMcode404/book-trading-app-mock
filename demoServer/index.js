require("dotenv").config({ path: __dirname + "/../.env" });
require("express-async-errors");
const { initLogger } = require("./startup/logging");
const connectExitHandlers = require("./startup/exitCleanUp");
const { createServer, getServer } = require("./startup/server");

if (process.argv[2] && !process.env.JWT_PRIVATE_KEY) {
  process.env.JWT_PRIVATE_KEY = process.argv[2];
}

if (!process.env.G_BOOKS_API_KEY)
  console.log("G_BOOKS_API_KEY not found: Search feature disabled.");
if (!process.env.JWT_PRIVATE_KEY)
  console.log(
    "JWT_PRIVATE_KEY not found: Sign up feature and Authentification disabled."
  );

initLogger();
createServer(process.env.PORT || 3000, (app) => {
  require("./startup/routes")(app);
});

connectExitHandlers();

module.exports = getServer();
