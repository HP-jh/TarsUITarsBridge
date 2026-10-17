/**
 * UI-TARS Bridge — Core Types
 * v0.1.0 MVP
 */

export interface UITarsConfig {
  endpoint?: string;
  apiKey?: string;
  model?: string;
  timeoutMs?: number;
}

export interface Point {
  x: number;
  y: number;
}

export interface ScreenshotResult {
  success: boolean;
  imageBase64?: string;
  format?: "png" | "jpeg";
  width?: number;
  height?: number;
  error?: string;
}

export interface ClickResult {
  success: boolean;
  coordinates?: Point;
  error?: string;
}

export interface TypeResult {
  success: boolean;
  text?: string;
  error?: string;
}

export interface ScrollResult {
  success: boolean;
  direction: "up" | "down" | "left" | "right";
  amount?: number;
  error?: string;
}

export interface BrowserOpenResult {
  success: boolean;
  url?: string;
  error?: string;
}

export type ToolResult =
  | ScreenshotResult
  | ClickResult
  | TypeResult
  | ScrollResult
  | BrowserOpenResult;
