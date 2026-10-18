# TarsUITarsBridge

[![Version](https://img.shields.io/badge/version-0.1.0-blue)](https://github.com/HP-jh/TarsUITarsBridge)
[![License](https://img.shields.io/badge/license-Apache%202.0-green)](LICENSE)

> MCP Bridge for [UI-TARS](https://github.com/bytedance/UI-TARS-desktop) — connects TSG gateway to UI-TARS desktop automation via Model Context Protocol.

## 关于作者

> 你好！我是这个项目的作者，一名正在读小学的学生。
> 这个项目从规划到代码实现，**完全由我自己主导设计，并借助 AI 工具完成**。每一行代码、每一个功能模块，都凝聚了我对技术的热爱与坚持。
> 如果你认可这个项目，或者觉得它对你有帮助，希望能给我一个 **Star** 支持，这对我意义重大！

## 欢迎支持

- 如果你在使用过程中遇到问题，欢迎提交 [Issue](https://github.com/HP-jh) 或参与讨论
- 如果你觉得项目不错，请点一个 **Star**，这是对我最大的鼓励
- 也欢迎分享给身边有需要的朋友，让更多人看到这个项目
- 后续功能迭代会继续推进，你的支持是我持续更新的动力

## ⚠️ 维护说明

> **本项目依赖 AI 服务套餐，若因套餐额度耗尽或服务商调整，可能导致更新暂时停滞。**
> 如遇较长时间未更新，请理解这是 AI 服务限制所致，并非项目放弃维护。
> 恢复服务后会第一时间继续推进，感谢你的耐心与包容。

---

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
