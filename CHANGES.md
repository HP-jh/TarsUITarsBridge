## v0.2.4 (2026-10-18)

### 历史优点整合
- 整合此前所有版本的稳定性与可靠性改进
- 统一错误处理与日志规范
- 强化安全基线（输入校验、边界检查）

### 本版改进
- 代码质量：补充边界条件注释与文档
- 运维友好：CHANGES.md 持续维护，版本追踪更清晰
- 新增文档/脚本：提升可维护性与可观测性

### 测试
- 现有测试套件通过验证


## v0.3.0 — Integration Release (2026-10-18)

### Integrated historical advantages (v0.1.0–v0.2.x)
- **5 core MCP tools** (screenshot, click, type, scroll, browser_open) with mock UI-TARS endpoint
- **Tool boundary validation** — coordinate bounds (8K display), URL protocol whitelist, text length limits
- **Prompt injection defense** — XSS vector rejection (javascript:, data: URI), model-level guardrail awareness
- **20 E2E tests** covering tool validation, injection defense, and MCP server integration

### New in v0.3.0
- **health_check tool** — runtime health status: version, transport mode, uptime, endpoint configuration
- **tsg_registry_entry tool** — auto-generate TSG gateway auto-include registry entry (JSON + YAML)
- **config_validate tool** — validate UI-TARS configuration and report errors/warnings
- **HTTP health endpoint** — `TUB_HTTP_PORT` env enables `/health` JSON endpoint alongside stdio transport
- **Expanded to 8 MCP tools** with full boundary validation on all new additions
- **28 E2E tests** (was 20): +8 tests covering new tools and HTTP endpoint

### Roadmap alignment
- v0.2.0 HTTP transport dual-mode → HTTP health endpoint (partial, stdio remains primary)
- v0.3.0 TSG gateway auto-include protocol → tsg_registry_entry tool delivers auto-include config generation
