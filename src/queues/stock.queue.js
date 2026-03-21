import { Queue } from "bullmq";

export const stockQueue = new Queue("stock", {
  connection: { host: "redis", port: 6379 },
});