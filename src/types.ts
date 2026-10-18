/**
 * UI-TARS Bridge — Core Types
 * v0.3.0 — TSG gateway auto-include + health check + config validation
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

export interface HealthCheckResult {
  success: boolean;
  version: string;
  transport: "stdio" | "http" | "dual";
  mode: "mock" | "real";
  endpointConfigured: boolean;
  timestamp: string;
  uptimeMs: number;
  error?: string;
}

export interface TSGRegistryEntryResult {
  success: boolean;
  registryJson: string;
  registryYaml: string;
  error?: string;
}

export interface ConfigValidateResult {
  success: boolean;
  valid: boolean;
  errors: string[];
  warnings: string[];
  error?: string;
}

export type ToolResult =
  | ScreenshotResult
  | ClickResult
  | TypeResult
  | ScrollResult
  | BrowserOpenResult
  | HealthCheckResult
  | TSGRegistryEntryResult
  | ConfigValidateResult;
