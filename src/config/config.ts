import { z } from "zod";
import logger from "./winston";
require("dotenv").config();

const envSchema = z.object({
  FRONTEND_URL: z.string(),
  NODE_ENV: z.string(),
  PORT: z.string(),
  DATABASE_URL: z.string(),
  PGHOST: z.string(),
  PGDATABASE: z.string(),
  PGUSER: z.string(),
  PGPASSWORD: z.string(),
  JWT_ACCESS_SECRET: z.string(),
  JWT_ACCESS_EXPIRATION_TIME: z.string(),
  JWT_REFRESH_SECRET: z.string(),
  JWT_REFRESH_EXPIRATION_TIME: z.string(),
  JWT_VERIFICATION_SECRET: z.string(),
  EMAIL_ADDRESS: z.string(),
  EMAIL_PASS: z.string(),
  AWS_S3_ACCESS_KEY: z.string(),
  AWS_S3_SECRET_KEY: z.string(),
  AWS_S3_BUCKET_NAME: z.string(),
  ENCRYPTION_ALGORITHM: z.string(),
  ENCRYPTION_SECRET: z.string(),
  ENCRYPTION_IV: z.string(),
});

let env = envSchema.safeParse(process.env);
if (!env.success) {
  logger.error(
    `Invalid environment variables: ${env.error.issues[0].path}, ${env.error.issues[0].message}`
  );
  process.exit(1);
}

export const config = env.data;
