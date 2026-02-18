## Introduction

OpenClaw is a **personal AI assistant platform** that you run on your own machines.  
It acts as a **gateway** between:

- **You and your devices** (laptop, phone, servers)
- **Messaging channels** you already use (WhatsApp, Telegram, Slack, Discord, Signal, iMessage, Microsoft Teams, WebChat, and more)
- **AI models and tools** (Anthropic, OpenAI, local models, browser automation, cron jobs, custom skills, etc.)

Instead of talking directly to each model or wiring every app by hand, you talk to **OpenClaw**.  
The gateway handles sessions, channels, routing, tools, and safety, so your assistant feels **local, consistent, and always‑on**.

This document is a gentle starting point for **anyone**:

- **Freshers / new developers** who want to understand what OpenClaw is and why it exists.
- **Experienced engineers** who want a mental model before reading the deeper docs or code.

If you just want to get it running, see **[Getting started](/start/getting-started)**.  
If you want to understand the system, read this introduction first, then the other overview docs in this folder.

### What OpenClaw solves

- **Too many chat surfaces**: People chat across WhatsApp, Telegram, Slack, Discord, email, etc.  
  OpenClaw gives you **one assistant** that can see and reply across these channels, with per‑channel rules.

- **Session memory and context**: Pure API calls do not remember your past conversations well.  
  OpenClaw keeps **long‑lived sessions** with configurable memory and tools, so each conversation can build on previous work.

- **Tools and automation**: You often need more than “just text” from a model.  
  OpenClaw makes it easy to let the assistant:
  - Browse the web
  - Run scripts and commands (with approvals)
  - Schedule jobs
  - Talk to your own services

- **Local control and security**: You might not want to send everything through a SaaS bot.  
  OpenClaw runs on your own machines and exposes a gateway that you control.

For a concise feature list, see **[Overview – Core capabilities](/overview/core-capabilities)**.

### How the docs in this folder are organized

This `overview` section is intended as a **learning path**:

- **`openclaw-overview.md`** — “What is OpenClaw?” at a conceptual level.
- **`core-capabilities.md`** — What it can do in practice, with examples.
- **`limitations-and-future-directions.md`** — What it does not do yet and what you can extend.
- **`architecture-overview.md`** — Technical overview and diagrams for the main components.

Once you are comfortable with this overview, you can dive into:

- **Concepts**: [Core concepts](/concepts/index) such as agents, sessions, channels, and tools.
- **Gateway**: [Gateway](/gateway) for how the control plane works.
- **Channels**: [Channels](/channels) for per‑platform details and configuration.
- **Tools and skills**: [Tools](/tools) and [Skills](/tools/skills) for extending the assistant.

> The goal of these docs is that **you can treat OpenClaw like an understandable system**,  
> not a black box. Even if you are new to TypeScript or distributed systems, you should be
> able to read these pages and build a solid mental model.
