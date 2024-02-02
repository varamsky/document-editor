import productionLogger from "./productionLogger";
import devlopmentLogger from "./developmentLogger";
import dotenv from "dotenv";

dotenv.config();
const logger =
  process.env.ENVIRONMENT === "devlopment"
    ? devlopmentLogger()
    : productionLogger();

export default logger;
