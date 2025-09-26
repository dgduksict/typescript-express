import { cron } from "..";
import logger from "../config/winston";

export async function startCronJobs() {
  cron.schedule("0 */5 * * * *", async () => {
    logger.info("Test cronjob.");
  });
}
