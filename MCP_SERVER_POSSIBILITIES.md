# MCP Server Capabilities (Quick Reference)

Short, general-purpose guidance on what MCP servers can expose, how authentication can be handled, what is required in tools/resources/prompts, and how to publish or deploy. This is intentionally high-level and not specific to any one project.

## 1) What an MCP server can expose

MCP servers can expose three categories to clients:

### Tools

Executable actions the client can invoke.

**Typical characteristics**

- Inputs are validated with a schema.
- Outputs are structured and predictable.
- May read/write files, call APIs, or perform computations.
- Should be idempotent where possible or clearly state side effects.

**What’s important in a tool definition**

- **Name**: Stable and descriptive.
- **Description**: Clear, actionable, and user-facing.
- **Input schema**: Required/optional parameters with types and constraints.
- **Output shape**: Consistent structure and error format.
- **Security**: Gate sensitive operations (auth, file writes, network calls).

### Resources

Read-only data that can be attached as context.

**Typical characteristics**

- Deterministic and safe to share.
- Focused on state the model should know (metadata, config, docs, etc.).

**What’s important in a resource definition**

- **URI**: Unique and stable identifier.
- **Name**: Human-friendly title.
- **Description**: What the resource contains.
- **Content type**: Text/JSON/other.
- **Access**: Ensure only safe content is exposed.

### Prompts

Reusable workflows or instructions the client can apply.

**Typical characteristics**

- Provide a guided, multi-step interaction.
- Combine tool calls and resources.

**What’s important in a prompt definition**

- **Name**: Short and discoverable.
- **Description**: When to use it.
- **Arguments**: Optional parameters for customization.
- **Expected flow**: The intended sequence of actions.

## 2) Authentication and authorization

MCP servers can implement multiple auth strategies. Common options include:

- **API key**: Simple shared secret passed via environment variables or headers.
- **OAuth 2.0**: Standard delegated auth when per-user access is required.
- **JWT/Bearer tokens**: Useful for service-to-service or enterprise auth.
- **No auth**: Acceptable for local/dev-only servers with no sensitive actions.

**Best practices**

- Protect tool execution when tools can mutate state or access external systems.
- Keep resources and prompts public when safe to reduce friction.
- Return consistent authorization errors when missing/invalid credentials.

## 3) Minimal checklist for server features

- Tools defined with clear input schemas and safe output formats.
- Resources defined with stable URIs and explicit content types.
- Prompts defined for common workflows.
- Logging and error handling that help client troubleshooting.
- Authentication strategy documented for developers.

## 4) Deployment and publishing options

Common distribution patterns:

### A) npx (zero-install distribution)

Publish to npm and allow clients to run with `npx`.

### B) Global npm install

Publish to npm and let users install globally, then reference the command.

### C) Local build (from source)

Build from source and run the server from a local path (useful for internal use).

### D) Private registry

Publish to a private npm registry for controlled distribution.

**Operational considerations**

- Provide a sample MCP configuration for your team.
- Document environment variables and secrets.
- Version and changelog your server so clients can pin releases.

## 5) Example capability map (generic)

- **Tools**: create/update files, generate docs, validate config, run analysis.
- **Resources**: project metadata, directory structure, docs, configuration snapshots.
- **Prompts**: “analyze-and-generate”, “review-and-improve”, “setup-guidelines”.

## 6) Limitations to consider

- MCP servers do not store memory by default; long-term context is client-owned.
- Security is your responsibility (especially for tool actions).
- Tool execution should be explicit and auditable in logs.

## 7) MCP lifecycle and capabilities (often overlooked)

MCP is stateful and requires an initialization handshake that negotiates protocol version and capabilities.

- **Initialization**: `initialize` request → `initialize` response → `notifications/initialized`.
- **Capabilities**: Advertise supported primitives and options (e.g., `tools`, `resources`, `prompts`, `logging`, `completions`, `tasks`).
- **List change notifications**: If you support dynamic tool/resource/prompt lists, advertise `listChanged` and emit `notifications/*/list_changed`.
- **Resource subscriptions**: If you support live updates, advertise `resources.subscribe`.
- **Timeouts/cancellation**: Implement request timeouts and handle cancellation notifications for long-running work.

## 8) Client-side primitives your server can call

Servers can request capabilities from the client/host:

- **Sampling**: Ask the host LLM for a completion without embedding a model SDK.
- **Elicitation**: Request user input or confirmation during a workflow.
- **Client logging**: Emit structured logs for diagnostics.

These are optional and must be negotiated during initialization.

## 9) Resources: templates and completion

Beyond fixed resources, MCP supports **resource templates** with parameters. Clients can offer parameter completion to help users discover valid values (e.g., city names, IDs). If you expose templates, provide clear metadata and expected MIME types.

## 10) Transports, security, and logging

MCP supports two standard transports:

- **Stdio**: Local subprocess. Never write to stdout except JSON-RPC messages. Log to stderr.
- **Streamable HTTP**: Remote, supports SSE for streaming. Must validate `Origin` headers to prevent DNS rebinding, and should bind to localhost when running locally. Use the `MCP-Protocol-Version` header for versioning.

**Azure note**: Azure Functions and APIM are HTTP-based, so they require **Streamable HTTP** support. Stdio-only MCP servers cannot run behind Functions or APIM without an HTTP transport adapter. APIM can front the MCP HTTP endpoint for auth, rate limits, and logging, but it does not replace the MCP server.

## 11) Publishing to the MCP Registry (optional)

If you want discoverability beyond internal usage:

- Add `mcpName` to `package.json`.
- Create `server.json` with metadata and package/transport details.
- Use `mcp-publisher` to authenticate and publish registry metadata.

## 12) SDKs (recommended)

Official SDKs (TypeScript, Python, Go, Kotlin, Swift, Java, C#, Ruby, Rust, PHP) provide protocol compliance, transport handling, and schema helpers. Using the SDK reduces implementation errors and keeps you aligned with spec changes.

---

This document is intended as a compact overview for developers evaluating MCP server capabilities and deployment patterns.
