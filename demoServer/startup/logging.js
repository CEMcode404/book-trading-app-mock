const winston = require("winston");

let loggerInstance;
function initLogger() {
  const { combine, timestamp, label, printf } = winston.format;
  const myFormat = printf(({ level, message, label, timestamp }) => {
    return `$${timestamp} [${label}] ${level} ${message}`;
  });
  const logger = winston.createLogger({
    level: "info",
    format: combine(label({ label: "log" }), timestamp(), myFormat),
    defaultMeta: { service: "user-service" },
    transports: [
      new winston.transports.File({
        filename: "logs/error.log",
        level: "error",
      }),
      // new winston.transports.File({ filename: "logs/combined.log" }),
    ],
    exceptionHandlers: [
      new winston.transports.File({ filename: "logs/exceptions.log" }),
    ],
    rejectionHandlers: [
      new winston.transports.File({ filename: "logs/rejections.log" }),
    ],
  });

  if (process.env.NODE_ENV !== "production") {
    logger.add(
      new winston.transports.Console({
        format: winston.format.simple(),
      })
    );
  }

  process.on("unhandledRejection", (ex) => {
    throw ex;
  });
  loggerInstance = logger;
}

function getLogger() {
  if (!loggerInstance) {
    console.log("Initialize logger first");
  }
  return loggerInstance;
}

module.exports = {
  initLogger,
  getLogger,
};
