## What is OpenClaw

OpenClaw is a **local-first AI gateway** that turns large language models and tools into a **personal assistant** that lives on your machines and across your messaging apps.

At a high level, OpenClaw:

- **Connects channels** like WhatsApp, Telegram, Slack, Discord, Signal, iMessage, Microsoft Teams, Matrix, Zalo, and WebChat.
- **Speaks to models and providers** such as Anthropic, OpenAI, Ollama, Bedrock, and others.
- **Runs agents** (primarily the Pi agent runtime) that maintain sessions, call tools, and generate responses.
- **Coordinates apps and nodes** on macOS, iOS, and Android for voice, canvas, and device control.

Instead of configuring each channel and tool independently, you configure **OpenClaw** once and let it orchestrate the rest.

### Core idea: the Gateway

The central component of OpenClaw is the **Gateway**:

- A long‑running process on your machine.
- Exposes a **WebSocket and HTTP API** (by default on `ws://127.0.0.1:18789`).
- Holds the **truth** about:
  - Which channels are connected
  - Which agents exist
  - Which tools and skills are available
  - What sessions and conversations are active

Everything else (CLI, macOS app, mobile nodes, WebChat UI) **talks to the Gateway**.

You can read more about the gateway itself in the main docs: [Gateway](/gateway).

### How OpenClaw fits into your environment

You typically deploy OpenClaw in one of these ways:

- **On your laptop or desktop** (macOS, Linux, Windows via WSL2)
  - Run the gateway locally.
  - Use the macOS app / CLI / WebChat UI to talk to it.
  - Connect personal messaging channels (WhatsApp, Telegram, etc.).

- **On a small server or VPS**
  - Run the gateway on a “home base” machine or VPS.
  - Use Tailscale, SSH tunnels, or other secure access methods.
  - Connect channels that must always be online (e.g., a WhatsApp number).

- **Hybrid**
  - Gateway on a server, macOS/iOS/Android apps acting as **nodes** that can:
    - Capture audio / video / screen
    - Show a Canvas
    - Provide voice wake and talk mode

In all cases, OpenClaw is designed to remain **single‑user and personal**.  
It is not a multi‑tenant SaaS for many unrelated users; it is **your personal assistant stack**.

### Key concepts (short version)

These concepts are covered in depth in the main docs under [Concepts](/concepts), but here is a quick summary tailored to this overview:

- **Gateway**  
  The central control plane. Tracks channels, agents, sessions, tools, and state. Exposes APIs and serves the Control UI and WebChat.

- **Agent**  
  A logical “persona” or workspace with:
  - Its own configuration (models, tools, skills)
  - Its own sessions and memory
  - Its own identity and avatar

  Most users start with one main agent but you can create more (for coding, research, ops, etc.).

- **Session**  
  A conversation thread between you (and possibly a group of people) and an agent.  
  Each session has:
  - A **session key** (which encodes channel, participants, and agent)
  - A **history** of messages and tool calls
  - Policies like how much history to keep, how to route replies, and how to chunk output

- **Channel**  
  A messaging surface (WhatsApp, Telegram, Slack, Discord, Signal, etc.).  
  Channels have:
  - Inbound events (messages, reactions, typing indicators)
  - Outbound messages, media, and interaction primitives
  - Pairing and allowlist rules (who is allowed to talk to the assistant)

- **Tools and skills**  
  Capabilities the agent can call to act in the world:
  - Browser control
  - File and process tools
  - Custom HTTP integrations
  - User‑defined skills shipped as code in your workspace or plugins

- **Plugins and extensions**  
  Optional packages that extend OpenClaw with:
  - New channels (e.g., Microsoft Teams, Matrix)
  - New providers and auth flows
  - New tools and services

For a deeper conceptual treatment, see:

- [Agents](/concepts/agent)
- [Sessions](/concepts/session)
- [Channels](/channels)
- [Tools and skills](/tools)
- [Plugins](/plugins)

### What OpenClaw is optimized for

OpenClaw is optimized for:

- **Personal ownership**  
  You control the runtime, configuration, and data. The gateway runs under your account on your devices or servers.

- **Multi‑channel presence**  
  Your assistant can appear in many places (WhatsApp, Telegram, Slack, etc.) but remain logically **one assistant** with consistent memory.

- **Tool‑heavy workflows**  
  Scenarios where the assistant does more than chat:
  - Browses the web to collect information
  - Executes scripts or commands with guardrails
  - Coordinates cron jobs and wakeups
  - Interacts with external services via skills

- **Incremental adoption**  
  You can start with:
  - A single channel (for example, just Telegram)
  - A single model provider
  - Minimal skills  
  And then expand gradually as your needs grow.

If you want to see concrete capabilities and examples, continue with **[Core capabilities](/overview/core-capabilities)**.
