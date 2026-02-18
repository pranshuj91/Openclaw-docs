## Architecture overview

This page gives a **technical overview** of how OpenClaw is built and how the main components interact.  
It is intended for developers and operators who want to understand the moving parts before diving into the code.

For deep reference, see:

- [Gateway](/gateway)
- [Agents](/concepts/agent)
- [Sessions](/concepts/session)
- [Channels](/channels)
- [Nodes and tools](/nodes)

### High-level architecture

At the highest level, OpenClaw looks like this:

```text
Messaging apps (WhatsApp, Telegram, Slack, Discord, Signal, iMessage, Teams, Matrix, Zalo, WebChat)
                        │
                        ▼
                 Channel adapters
            (core + extension plugins)
                        │
                        ▼
        ┌─────────────────────────────────┐
        │             Gateway             │
        │         (control plane)         │
        │  ws://127.0.0.1:18789 + HTTP    │
        └────────────────┬────────────────┘
                         │
      ┌──────────────────┴──────────────────┐
      │                  │                  │
      ▼                  ▼                  ▼
   Agents            Apps / Nodes        Tools / Skills
 (Pi runtime)     (macOS / iOS / Android)  (Browser, exec, APIs)
```

Key ideas:

- The **Gateway** is the central control plane that:
  - Manages configuration, sessions, channels, and tools.
  - Exposes a WebSocket + HTTP API.
  - Serves the Control UI and WebChat frontend.

- **Channel adapters** translate between external messaging platforms and OpenClaw’s internal message format.

- **Agents** (Pi runtime) run inside the gateway process (embedded mode) and:
  - Consume session history and tool results.
  - Produce replies and tool calls.

- **Nodes and apps** (macOS, iOS, Android) connect to the gateway as clients and:
  - Expose device capabilities (audio, camera, screen, location).
  - Present UI surfaces (canvas, overlays, notifications).

### Tech stack overview

#### Core runtime

- **Language**: TypeScript, targeting modern Node (Node ≥ 22).
- **Runtime style**: ES modules, strict typing, minimal `any`.
- **Packaging**:
  - Source under `src/`.
  - Compiled output under `dist/`.
  - CLI entrypoint: `openclaw.mjs` → `dist/entry.js`.

- **Key libraries and tools**:
  - CLI: Commander‑style programs and custom formatting utilities.
  - Testing: [Vitest] with coverage.
  - Linting and formatting: Oxlint + Oxfmt.
  - Bundling: tsdown, rolldown, and related tooling.

#### Frontend (Control UI and WebChat)

- Located under `ui/`.
- Uses:
  - TypeScript
  - Modern build tooling (Vite)
  - WebSocket and HTTP APIs exposed by the gateway.

The UI is built and then served by the gateway as static assets.

#### Native apps and nodes

- **macOS app** (menu bar, Canvas, Voice Wake / Talk Mode)
  - Implemented in Swift / SwiftUI.
  - Communicates with the gateway via WebSocket and HTTP.

- **iOS and Android nodes**
  - Implemented in Swift/Kotlin for native capabilities.
  - Expose camera, microphone, screen sharing, and notifications to the gateway.

See [Platforms](/platforms/index) for more platform‑specific details.

### Core modules in the repository

This is a high‑level map of important directories in `src/`:

- **`src/cli`**  
  Wiring for the `openclaw` command:
  - Parses CLI arguments.
  - Registers subcommands (gateway, agent, message, onboard, doctor, etc.).
  - Manages prompts, progress indicators, and output formatting.

- **`src/commands`**  
  Implementation of individual CLI commands:
  - `agent.ts`: runs an embedded agent for a given message / session.
  - `gateway-*.ts`: start, probe, and inspect the gateway.
  - `onboard-*.ts`: onboarding wizard.
  - `doctor-*.ts`: diagnostics and migrations.

- **`src/gateway`**  
  Gateway control plane:
  - `server.impl.ts` and `server.ts`: starting and shutting down the gateway.
  - `server-http.ts` and `server-ws-runtime.ts`: HTTP and WebSocket surfaces.
  - `server-model-catalog.ts`: model registry.
  - `server-cron.ts`, `server-maintenance.ts`: timers and background work.
  - `server-plugins.ts`: loading and wiring plugins into the gateway.

- **`src/agents`**  
  Agent runtime integration:
  - Model catalog, compatibility, and selection.
  - Auth profile management and failover.
  - Integration with the Pi agent runtime (`pi-embedded-*`).
  - Session compaction, memory search, and lane management.

- **`src/channels`** + individual channel directories  
  - Abstract channel types and utilities.
  - Channel plugin registry.
  - Concrete adapters for Telegram, Slack, Discord, Signal, iMessage, and others.

- **`src/plugins`**  
  Plugin runtime:
  - Types and manifest formats.
  - Registry and loader.
  - Hooks into gateway, sessions, messages, and tools.

- **`src/media`, `src/media-understanding`, `src/memory`, `src/infra`, `src/logging`**  
  Supporting systems for:
  - Media pipelines (images, audio, video).
  - Long‑term memory.
  - Environment handling, diagnostics, and logging.

For a more detailed repository map, see `AGENTS.md` in the project root and the existing docs under [Reference](/reference).

### Control flow: from message to reply

Here is a simplified end‑to‑end flow when someone messages your assistant.

#### 1. Incoming message from a channel

1. A user sends a message on WhatsApp / Telegram / Slack / another channel.
2. The channel adapter (core or plugin) receives a webhook / event.
3. The adapter normalizes the event into:
   - Sender identity
   - Channel and account
   - Thread / conversation identifiers
   - Message content and media

This creates or updates a **session** in the gateway.

#### 2. Session resolution and routing

4. The gateway:
   - Computes or looks up the **session key**.
   - Applies routing rules to decide which **agent** should handle the message.
   - Checks pairing / allowlist policies to see if the sender is allowed.

5. The message is appended to the session history (with metadata).

#### 3. Agent run

6. The gateway or CLI calls into the agent runtime via the embedded Pi integration.
7. The agent:
   - Reads the session history (possibly compacted and pruned).
   - Uses the configured model and tools for that agent / session.
   - Streams back:
     - Partial text
     - Tool calls and arguments
     - Final replies

8. Tool calls may:
   - Invoke browser control.
   - Run skills.
   - Interact with nodes (for example, capturing audio, screenshots).

#### 4. Reply delivery

9. Once the agent produces a reply:
   - The gateway formats it for the target channel.
   - Applies per‑channel rules (for example, quoting, reply tags, mention syntax).
   - Sends it using the channel adapter.

10. The reply and any tool outputs are appended to the session history for future turns.

### Deployment patterns

OpenClaw supports several deployment patterns, all based on the same architecture.

- **Local single‑machine**
  - Gateway, CLI, and Control UI on your laptop.
  - Suitable for development and personal usage.

- **Gateway on a server, nodes on devices**
  - Gateway on a VPS or home server.
  - macOS/iOS/Android nodes connect over Tailscale or secure tunnels.
  - Good for always‑on WhatsApp / Telegram presence.

- **Hybrid with plugins and custom skills**
  - Gateway in a managed environment (for example, a dedicated server).
  - Custom plugins and skills providing:
    - Internal APIs
    - Deployment control
    - Monitoring integrations

The underlying core remains the same; only the **placement** of components changes.

### Where to go next

If you want to go deeper:

- **High‑level usage**: [Getting started](/start/getting-started)
- **Gateway behavior**: [Gateway](/gateway)
- **Model configuration**: [Models](/concepts/models)
- **Tools and skills**: [Tools](/tools)
- **Plugins and extensions**: [Plugins](/plugins)

You can also open the source code and explore:

- `src/entry.ts` and `src/index.ts` for entrypoints.
- `src/gateway/server.impl.ts` for gateway startup.
- `src/agents/pi-embedded-*` for agent integration.
- `src/channels` and `extensions/*` for channel integrations.
