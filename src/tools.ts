/**
 * UI-TARS Bridge — MCP Tool Implementations
 * v0.1.0 MVP: mock UI-TARS endpoint for rapid iteration
 */

import type {
  ScreenshotResult,
  ClickResult,
  TypeResult,
  ScrollResult,
  BrowserOpenResult,
  UITarsConfig,
  Point,
} from "./types.js";

const DEFAULT_TIMEOUT = 30000;

function validateCoordinates(p: Point): string | null {
  if (typeof p.x !== "number" || typeof p.y !== "number") {
    return "coordinates must be numbers";
  }
  if (p.x < 0 || p.y < 0) {
    return "coordinates must be non-negative";
  }
  if (p.x > 7680 || p.y > 4320) {
    return "coordinates exceed maximum display bounds (8K)";
  }
  return null;
}

function validateUrl(url: string): string | null {
  try {
    const u = new URL(url);
    if (!["http:", "https:"].includes(u.protocol)) {
      return "URL must use http or https protocol";
    }
    return null;
  } catch {
    return "invalid URL format";
  }
}

function mkErr<T>(msg: string): T {
  return { success: false, error: msg } as unknown as T;
}

/* ── 1. screenshot ── */
export async function screenshot(
  _config: UITarsConfig,
  args: Record<string, unknown>,
): Promise<ScreenshotResult> {
  const fmt = (args.format as string) || "png";
  if (!["png", "jpeg"].includes(fmt)) {
    return mkErr("format must be 'png' or 'jpeg'");
  }
  // v0.1.0 mock: return a 1x1 transparent pixel in base64
  const mockPng =
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";
  return {
    success: true,
    imageBase64: mockPng,
    format: fmt as "png" | "jpeg",
    width: 1920,
    height: 1080,
  };
}

/* ── 2. click ── */
export async function click(
  _config: UITarsConfig,
  args: Record<string, unknown>,
): Promise<ClickResult> {
  const p: Point = { x: args.x as number, y: args.y as number };
  const err = validateCoordinates(p);
  if (err) return mkErr(err);
  return { success: true, coordinates: p };
}

/* ── 3. type ── */
export async function typeText(
  _config: UITarsConfig,
  args: Record<string, unknown>,
): Promise<TypeResult> {
  const text = args.text as string;
  if (typeof text !== "string") {
    return mkErr("text must be a string");
  }
  if (text.length === 0) {
    return mkErr("text must not be empty");
  }
  if (text.length > 10000) {
    return mkErr("text exceeds 10000 character limit");
  }
  return { success: true, text };
}

/* ── 4. scroll ── */
export async function scroll(
  _config: UITarsConfig,
  args: Record<string, unknown>,
): Promise<ScrollResult> {
  const dir = args.direction as string;
  if (!["up", "down", "left", "right"].includes(dir)) {
    return mkErr("direction must be one of: up, down, left, right");
  }
  const amount = typeof args.amount === "number" ? args.amount : 300;
  if (amount <= 0 || amount > 10000) {
    return mkErr("amount must be between 1 and 10000");
  }
  return { success: true, direction: dir as "up" | "down" | "left" | "right", amount };
}

/* ── 5. browser_open ── */
export async function browserOpen(
  _config: UITarsConfig,
  args: Record<string, unknown>,
): Promise<BrowserOpenResult> {
  const url = args.url as string;
  if (typeof url !== "string") {
    return mkErr("url must be a string");
  }
  const err = validateUrl(url);
  if (err) return mkErr(err);
  return { success: true, url };
}
