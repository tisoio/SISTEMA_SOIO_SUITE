import "dotenv/config";
import Fastify from "fastify";
import cors from "@fastify/cors";
import { SITE_CHANNEL_NAME } from "@soio/shared";

const port = Number(process.env.PORT ?? 4000);
const host = process.env.HOST ?? "0.0.0.0";

async function buildApp() {
  const app = Fastify({ logger: true });

  await app.register(cors, {
    origin: process.env.CORS_ORIGIN?.split(",") ?? [
      "http://localhost:3000",
      "https://loja.soio.com.br",
    ],
  });

  app.get("/health", async () => ({
    status: "ok",
    channel: SITE_CHANNEL_NAME,
    timestamp: new Date().toISOString(),
  }));

  app.get("/api/v1", async () => ({
    name: "SOIO Loja API",
    version: "0.1.0",
  }));

  return app;
}

async function start() {
  const app = await buildApp();
  await app.listen({ port, host });
  console.log(`API listening on http://${host}:${port}`);
}

start().catch((err) => {
  console.error(err);
  process.exit(1);
});
