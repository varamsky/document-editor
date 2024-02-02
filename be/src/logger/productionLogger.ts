import { createLogger, format, transports } from "winston";
const { combine, timestamp, json } = format;

const productionLogger = () => {
  return createLogger({
    level: "debug",
    format: combine(timestamp(), json()),

    transports: [
      new transports.Console(),
      new transports.File({
        filename: "errors.log",
      }),
    ],
  });
};

export default productionLogger;
