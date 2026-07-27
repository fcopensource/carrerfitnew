const http = require("node:http");
const next = require("next");

const port = Number(process.env.PORT || 3000);
const hostname = "0.0.0.0";

async function start() {
  console.log(`[startup] booting CarrerFit on ${hostname}:${port}`);
  console.log(`[startup] NODE_ENV=${process.env.NODE_ENV || "undefined"}`);

  const app = next({ dev: false, hostname, port, dir: process.cwd() });
  await app.prepare();

  const handle = app.getRequestHandler();
  const server = http.createServer((req, res) => handle(req, res));

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
