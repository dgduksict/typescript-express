import express, { Request, Response } from "express";
import { config } from "./config/config";
import helmet from "helmet";
import cors from "cors";
import { Redis } from "ioredis";

require("dotenv").config();

import bodyParser from "body-parser";
import { notFound } from "./middlewares/notFound";
import { errorHandler } from "./middlewares/errorHandler";
import { sizeLimitConstants } from "./lib/constants";
import { version } from "../package.json";
import logger from "./config/winston";
import { db } from "./utils/db";
import { startCronJobs } from "./cronjob";
import { userRoutes } from "./routes/userRoutes";

// export const redis = new Redis(config.REDIS_CONNECTION_STRING);
export const cron = require("node-cron");

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: `Test API ${version} - 👋🌎`,
  });
});

app.use(
  cors({
    origin: [config.FRONTEND_URL],
    credentials: true,
  })
);
app.use(helmet());
app.use(bodyParser.json());
app.use(express.json({ limit: sizeLimitConstants.jsonSizeLimit }));
app.use(
  express.urlencoded({
    limit: sizeLimitConstants.formDataSizeLimit,
    extended: true,
  })
);

app.use("/api/user", userRoutes);

app.use(notFound);
app.use(errorHandler);

// process.on("SIGTERM", cleanup);
// process.on("SIGINT", cleanup);

// async function cleanup() {
//   logger.info("Received shutdown signal, cleaning up...");
//   try {
//     await db.destroy();
//     // await redis.disconnect();

//     logger.info("Cleanup successful");
//     process.exit(0);
//   } catch (err) {
//     logger.error("Error during cleanup:", err);
//     process.exit(1);
//   }
// }

startCronJobs();

export default app;
export const server = app.listen(config.PORT, () => {
  logger.info(`Server is running on port ${config.PORT}`);
});
