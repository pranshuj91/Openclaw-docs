## Core capabilities

This page summarizes **what OpenClaw can do** at a practical level.  
It is written so that both beginners and experienced engineers can quickly see the value and map it to real workflows.

For deeper configuration and reference, see:

- [Getting started](/start/getting-started)
- [Gateway](/gateway)
- [Channels](/channels)
- [Agents](/concepts/agent)
- [Tools and skills](/tools)

### Messaging and channels

OpenClaw can connect to many messaging platforms and present a **single assistant identity** across them.

- **Supported core channels** (via built‑in integrations and extensions):
  - WhatsApp
  - Telegram
  - Slack
  - Discord
  - Google Chat
  - Signal
  - iMessage (via BlueBubbles and legacy iMessage)
  - Microsoft Teams (extension)
  - Matrix (extension)
  - Zalo and Zalo Personal (extensions)
  - WebChat and Control UI

- **Capabilities per channel** typically include:
  - Receiving and sending text messages
  - Handling replies, mentions, and group routing
  - Sending and receiving media (images, audio, files) within platform limits
  - Respecting per‑channel policies (who can DM, which groups are allowed)

You can read the per‑channel behavior and setup in [Channels](/channels).

### Agent sessions and memory

OpenClaw provides **structured sessions** for conversations:

- **Session keys** uniquely identify a conversation and encode:
  - Channel and account
  - Participants
  - Agent identity

- **Per‑session memory and history management**:
  - Keeps a configurable history of messages and tool calls.
  - Applies compaction and pruning strategies to stay within model context limits.
  - Encodes group rules, reply routing, and DM behavior.

- **Multiple agents**:
  - You can define multiple agents (for example, “General”, “Coder”, “Ops”).
  - Each agent can have different models, tools, and configuration.

See [Sessions](/concepts/session) and [Groups](/channels/groups) for details.

### Models and providers

OpenClaw supports a **flexible model layer**:

- **Multiple providers**:
  - Anthropic, OpenAI, Ollama, and others via provider adapters.
  - Additional providers and auth flows via plugins.

- **Model selection and failover**:
  - You choose default models per agent or per session.
  - OpenClaw can fall back to alternative models when quotas or errors occur.
  - Auth profiles and provider rotation are handled centrally.

- **Long‑context and reasoning**:
  - Designed to work well with modern long‑context models.
  - Supports settings for “thinking level” (how deeply the agent should reason) where supported by providers.

For configuration, see [Models](/concepts/models) and [Model failover](/concepts/model-failover).

### Tools, skills, and automation

OpenClaw turns your assistant into an **operator**, not just a chat interface.

- **Browser tools**:
  - Open dedicated Chromium profiles.
  - Navigate, click, type, capture snapshots.
  - Upload files and scrape content using a structured, agent‑friendly interface.
  - See [Browser tool](/tools/browser) for details.

- **System tools and nodes**:
  - Run commands and scripts with approval flows.
  - Access audio, camera, and screen via macOS/iOS/Android nodes.
  - Schedule recurring jobs via cron‑like configuration.
  - Integrate webhooks and external triggers.
  - See [Nodes](/nodes) and [Cron jobs](/automation/cron-jobs).

- **Skills platform**:
  - Define custom skills in your workspace or plugins.
  - Expose HTTP APIs, internal services, or scripts as tools.
  - Control installation, configuration, and security.
  - See [Skills](/tools/skills).

### Multi‑channel routing and policies

OpenClaw is careful about **who can talk to your assistant** and how messages are routed.

- **DM pairing and allowlists**:
  - Default policies require explicit pairing or approval for new direct message senders.
  - You can approve senders via CLI commands (for example, `openclaw pairing approve ...`).
  - Policies can be relaxed, but the system will warn you about risky settings.

- **Group routing**:
  - Configure what happens in groups (for example, only respond to mentions, use reply tags, etc.).
  - Keep sessions isolated per group and per participant where appropriate.

See [Channels](/channels) and [Channel routing](/channels/channel-routing) for more detail.

### Apps, nodes, and voice

OpenClaw ships with companion apps and node modes that extend the assistant beyond chat:

- **macOS app**:
  - Menu bar control for the gateway.
  - Voice Wake and Push‑to‑Talk (Talk Mode).
  - Canvas integration and WebChat UI.
  - See [macOS app](/platforms/macos).

- **iOS and Android nodes**:
  - Provide camera, screen recording, microphone, and location tools.
  - Support Voice Wake and Talk Mode features.
  - Expose capabilities back to the gateway via node protocols.
  - See [iOS](/platforms/ios) and [Android](/platforms/android).

- **macOS node mode**:
  - Let the macOS app act as a node for system automation, notifications, and canvas.

### Observability, safety, and operations

OpenClaw includes tools to keep your system healthy and safe:

- **Doctor and diagnostics**:
  - `openclaw doctor` inspects configuration, state, and known migration paths.
  - Reports risky DM policies, missing state directories, or legacy configs.
  - See [Doctor](/gateway/doctor).

- **Logging and debugging**:
  - Structured logging across gateway, agents, nodes, and tools.
  - Control UI for inspecting sessions, messages, and node status.
  - Unified logging helpers on macOS to inspect gateway behavior.

- **Packaging and distribution**:
  - CLI and gateway packaged for Node.
  - macOS app, iOS and Android apps for node functionality.
  - Docker, Nix, and VPS guides for different deployment styles.

### Example workflows

Here are a few concrete ways you might use OpenClaw day to day:

- **Personal messaging hub**:
  - Connect WhatsApp and Telegram.
  - Configure a single “Personal” agent that:
    - Summarizes long threads
    - Drafts replies
    - Sets reminders via cron jobs

- **Research assistant**:
  - Use the browser tool to:
    - Visit documentation sites
    - Collect information into a long session
    - Produce structured outputs (notes, checklists, plans)

- **Developer helper**:
  - Run the gateway locally during development.
  - Add workspace skills that:
    - Run tests or linters
    - Inspect logs or dashboards
    - Interact with your deployment tooling

- **Ops and monitoring**:
  - Use cron jobs and webhooks to:
    - Watch certain conditions (for example, queue size, error rates)
    - Ping you on Signal or Telegram when something looks wrong
    - Let you ask “what is going on?” from any channel and get a quick status report

If you want to understand what OpenClaw does **not** handle by default, continue with **[Limitations and future directions](/overview/limitations-and-future-directions)**.
