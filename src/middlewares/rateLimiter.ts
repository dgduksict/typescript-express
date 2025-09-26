import { createRateLimiter } from "../lib/createRateLimiter";

export const exampleRateLimiter = createRateLimiter({
  keyPrefix: "limiter",
  limit: 10,
  window: 3 * 60,
});
