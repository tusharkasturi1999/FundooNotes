const { createLogger, format, transports } = require("winston");
require("winston-daily-rotate-file");
const { combine, timestamp, prettyPrint, json } = format;

var transport = new transports.DailyRotateFile({
  filename: "./logger/Log-%DATE%.log",
  datePattern: "DD-MM-YYYY",
});

const logger = createLogger({
  level: "info",
  format: combine(
    json(),
    timestamp({ format: "DD-MM-YYYY, HH:mm:ss" }),
    prettyPrint()
  ),
  transports: [transport],
});

module.exports = logger
