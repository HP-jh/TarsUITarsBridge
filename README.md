# TarsUITarsBridge

[![Version](https://img.shields.io/badge/version-0.1.0-blue)](https://github.com/HP-jh/TarsUITarsBridge)
[![License](https://img.shields.io/badge/license-Apache%202.0-green)](LICENSE)

> MCP Bridge for [UI-TARS](https://github.com/bytedance/UI-TARS-desktop) — connects TSG gateway to UI-TARS desktop automation via Model Context Protocol.

## Overview

TarsUITarsBridge wraps the UI-TARS desktop automation client as an MCP server with stdio transport, enabling TSG (TarsSecureGuard) gateway to remotely control desktop environments through a standardized protocol.

- **Independent repository** — evolves separately from TSG gateway
- **Auto-include ready** — TSG gateway can mount this bridge automatically via configuration
- **MCP-native** — speaks standard Model Context Protocol (stdio transport in v0.1.0)

## Quick Start

```bash
# Install dependencies
npm install

# Build
npm run build

# Run (mock mode if no UI-TARS endpoint configured)
npm start
```

## Configuration

| Environment Variable | Description | Default |
|---|---|---|
| `UI_TARS_ENDPOINT` | UI-TARS API endpoint URL | *(mock mode)* |
| `UI_TARS_API_KEY` | API key for the endpoint | — |
| `UI_TARS_MODEL` | Model name | `ui-tars-1.5-7b` |
| `UI_TARS_TIMEOUT_MS` | Request timeout | `30000` |

## MCP Tools (v0.1.0)

| Tool | Description |
|---|---|
| `screenshot` | Capture screen (PNG/JPEG) |
| `click` | Click at (x, y) coordinates |
| `type` | Type text into focused input |
| `scroll` | Scroll in direction (up/down/left/right) |
| `browser_open` | Open a URL in the default browser |

## Roadmap

- **v0.1.0** — MVP: stdio transport + 5 tools + mock endpoint ✅
- **v0.2.0** — HTTP transport dual-mode + official MCP server mount
- **v0.3.0** — TSG gateway auto-include protocol
- **v0.4.0** — Tauri sidecar integration (cross-platform)
- **v0.5.0** — Self-hosted vLLM deployment docs
- **v1.0.0** — 10+ tools, multi-device routing, penetration test report

## Integration with TSG Gateway

In TSG gateway configuration, enable the bridge:

```json
{
  "bridges": {
    "ui_tars": {
      "enabled": true,
      "command": "npx tars-ui-tars-bridge",
      "env": {
        "UI_TARS_ENDPOINT": "http://localhost:8080"
      }
    }
  }
}
```

## License

Apache-2.0 — see [LICENSE](LICENSE)

## Changelog

### v1.0.1
- Version bump with stability improvements
