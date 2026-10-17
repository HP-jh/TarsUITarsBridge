#!/usr/bin/env node
/**
 * TarsUITarsBridge — Entry Point
 * v0.1.0 MVP
 *
 * Usage:
 *   npx tars-ui-tars-bridge
 *   node dist/index.js
 *
 * Environment:
 *   UI_TARS_ENDPOINT  — UI-TARS API endpoint (optional, mock mode if unset)
 *   UI_TARS_API_KEY   — API key for UI-TARS endpoint
 *   UI_TARS_MODEL     — Model name (default: ui-tars-1.5-7b)
 */

import { startServer } from "./server.js";
import type { UITarsConfig } from "./types.js";

function loadConfig(): UITarsConfig {
  return {
    endpoint: process.env.UI_TARS_ENDPOINT,
    apiKey: process.env.UI_TARS_API_KEY,
    model: process.env.UI_TARS_MODEL || "ui-tars-1.5-7b",
    timeoutMs: parseInt(process.env.UI_TARS_TIMEOUT_MS || "30000", 10),
  };
}

async function main(): Promise<void> {
  const cfg = loadConfig();
  if (!cfg.endpoint) {
    console.error("[TUB] No UI_TARS_ENDPOINT set — running in MOCK mode (v0.1.0 MVP)");
  }
  await startServer(cfg);
}

main().catch((err) => {
  console.error("[TUB] Fatal error:", err);
  process.exit(1);
});
