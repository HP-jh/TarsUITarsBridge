/**
 * UI-TARS Bridge — MCP Server (stdio transport)
 * v0.1.0 MVP
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  type CallToolRequest,
  type TextContent,
} from "@modelcontextprotocol/sdk/types.js";

import { screenshot, click, typeText, scroll, browserOpen } from "./tools.js";
import type { UITarsConfig } from "./types.js";

export function createServer(config: UITarsConfig = {}): Server {
  const server = new Server(
    {
      name: "tars-ui-tars-bridge",
      version: "0.1.0",
    },
    {
      capabilities: { tools: {} },
    },
  );

  server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: [
      {
        name: "screenshot",
        description: "Capture a screenshot of the current screen",
        inputSchema: {
          type: "object" as const,
          properties: {
            format: {
              type: "string" as const,
              enum: ["png", "jpeg"],
              description: "Image format (default: png)",
            },
          },
        },
      },
      {
        name: "click",
        description: "Click at the specified screen coordinates",
        inputSchema: {
          type: "object" as const,
          properties: {
            x: { type: "number" as const, description: "X coordinate" },
            y: { type: "number" as const, description: "Y coordinate" },
          },
          required: ["x", "y"],
        },
      },
      {
        name: "type",
        description: "Type the given text into the focused input field",
        inputSchema: {
          type: "object" as const,
          properties: {
            text: { type: "string" as const, description: "Text to type" },
          },
          required: ["text"],
        },
      },
      {
        name: "scroll",
        description: "Scroll the screen in the specified direction",
        inputSchema: {
          type: "object" as const,
          properties: {
            direction: {
              type: "string" as const,
              enum: ["up", "down", "left", "right"],
              description: "Scroll direction",
            },
            amount: {
              type: "number" as const,
              description: "Scroll amount in pixels (default: 300)",
            },
          },
          required: ["direction"],
        },
      },
      {
        name: "browser_open",
        description: "Open a URL in the default browser",
        inputSchema: {
          type: "object" as const,
          properties: {
            url: { type: "string" as const, description: "URL to open" },
          },
          required: ["url"],
        },
      },
    ],
  }));

  server.setRequestHandler(CallToolRequestSchema, async (req: CallToolRequest) => {
    const { name, arguments: args = {} } = req.params;

    try {
      let result: unknown;
      switch (name) {
        case "screenshot":
          result = await screenshot(config, args);
          break;
        case "click":
          result = await click(config, args);
          break;
        case "type":
          result = await typeText(config, args);
          break;
        case "scroll":
          result = await scroll(config, args);
          break;
        case "browser_open":
          result = await browserOpen(config, args);
          break;
        default:
          return {
            content: [
              {
                type: "text" as const,
                text: JSON.stringify({ success: false, error: `unknown tool: ${name}` }),
              },
            ],
            isError: true,
          };
      }

      const textContent: TextContent = {
        type: "text" as const,
        text: JSON.stringify(result),
      };
      const isError =
        typeof result === "object" &&
        result !== null &&
        "success" in result &&
        result.success === false;
      return {
        content: [textContent],
        isError,
      };
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      return {
        content: [
          {
            type: "text" as const,
            text: JSON.stringify({ success: false, error: msg }),
          },
        ],
        isError: true,
      };
    }
  });

  return server;
}

export async function startServer(config?: UITarsConfig): Promise<void> {
  const server = createServer(config);
  const transport = new StdioServerTransport();
  await server.connect(transport);
}
