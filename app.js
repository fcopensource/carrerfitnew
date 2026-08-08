const http = require("node:http");
const next = require("next");

const port = Number(process.env.PORT || 3000);
const hostname = "0.0.0.0";

async function start() {
  console.log(`[startup] booting CarrerFit on ${hostname}:${port}`);
  console.log(`[startup] NODE_ENV=${process.env.NODE_ENV || "undefined"}`);

  // Production serves Next and the protected job-ingestion API from one server.
  // Keep this set before loading the compiled API so it does not open a second port.
  process.env.CARRERFIT_COMBINED_SERVER = "1";
  const { app: api, apiErrorHandler } = require("./dist/server/index.js");
  api.use((_req, res) => res.status(404).json({ message: "API route not found" }));
  api.use(apiErrorHandler);

  const app = next({ dev: false, hostname, port, dir: process.cwd() });
  await app.prepare();

  const handle = app.getRequestHandler();
  const server = http.createServer((req, res) => {
    if (req.url?.startsWith("/api/")) return api(req, res);
    return handle(req, res);
  });

  server.listen(port, hostname, () => {
    console.log(`[startup] CarrerFit listening on http://${hostname}:${port}`);
  });

  function shutdown(signal) {
    console.log(`[shutdown] received ${signal}`);
    server.close(() => process.exit(0));
    setTimeout(() => process.exit(1), 10000).unref();
  }

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
}

process.on("uncaughtException", (error) => {
  console.error("[startup] uncaughtException", error);
  process.exit(1);
});

process.on("unhandledRejection", (error) => {
  console.error("[startup] unhandledRejection", error);
  process.exit(1);
});

start().catch((error) => {
  console.error("[startup] CarrerFit failed to start", error);
  process.exit(1);
});
