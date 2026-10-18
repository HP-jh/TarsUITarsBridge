#!/usr/bin/env node
/**
 * TarsUITarsBridge — Entry Point
 * v0.3.0 — TSG gateway auto-include + HTTP health endpoint + config validation
 *
 * Usage:
 *   npx tars-ui-tars-bridge
 *   node dist/index.js
 *   TUB_HTTP_PORT=8080 node dist/index.js   # enable HTTP health endpoint
 *
 * Environment:
 *   UI_TARS_ENDPOINT  — UI-TARS API endpoint (optional, mock mode if unset)
 *   UI_TARS_API_KEY   — API key for UI-TARS endpoint
 *   UI_TARS_MODEL     — Model name (default: ui-tars-1.5-7b)
 *   UI_TARS_TIMEOUT_MS — Request timeout (default: 30000)
 *   TUB_HTTP_PORT     — HTTP health endpoint port (optional, disables stdio if set)
 */

import { createServer } from "./server.js";
import type { UITarsConfig } from "./types.js";
import http from "node:http";

const VERSION = "0.3.0";
const START_TIME = Date.now();

function loadConfig(): UITarsConfig {
  return {
    endpoint: process.env.UI_TARS_ENDPOINT,
    apiKey: process.env.UI_TARS_API_KEY,
    model: process.env.UI_TARS_MODEL || "ui-tars-1.5-7b",
    timeoutMs: parseInt(process.env.UI_TARS_TIMEOUT_MS || "30000", 10),
  };
}

function buildHealthResponse(config: UITarsConfig): object {
  return {
    name: "tars-ui-tars-bridge",
    version: VERSION,
    status: "healthy",
    mode: config.endpoint ? "real" : "mock",
    endpointConfigured: !!config.endpoint,
    transport: "stdio",
    timestamp: new Date().toISOString(),
    uptimeMs: Date.now() - START_TIME,
    capabilities: [
      "screenshot",
      "click",
      "type",
      "scroll",
      "browser_open",
      "health_check",
      "tsg_registry_entry",
      "config_validate",
    ],
  };
}

async function startHttpHealthServer(port: number, config: UITarsConfig): Promise<void> {
  const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");

    if (req.url === "/health" || req.url === "/") {
      res.writeHead(200);
      res.end(JSON.stringify(buildHealthResponse(config), null, 2));
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ error: "not found", path: req.url }));
    }
  });

  await new Promise<void>((resolve) => server.listen(port, resolve));
  console.error(`[TUB] HTTP health endpoint listening on http://localhost:${port}/health`);
}

async function main(): Promise<void> {
  const cfg = loadConfig();
  const httpPort = process.env.TUB_HTTP_PORT
    ? parseInt(process.env.TUB_HTTP_PORT, 10)
    : undefined;

  if (!cfg.endpoint) {
    console.error("[TUB] No UI_TARS_ENDPOINT set — running in MOCK mode (v0.3.0)");
  }

  if (httpPort && !isNaN(httpPort)) {
    // HTTP mode: start health endpoint, then stdio transport in background
    await startHttpHealthServer(httpPort, cfg);
    const { startServer } = await import("./server.js");
    await startServer(cfg);
  } else {
    // Stdio-only mode
    const { startServer } = await import("./server.js");
    await startServer(cfg);
  }
}

main().catch((err) => {
  console.error("[TUB] Fatal error:", err);
  process.exit(1);
});
