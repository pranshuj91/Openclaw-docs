## Limitations and future directions

OpenClaw is powerful, but it is **not a magic box** that solves every problem automatically.  
This page explains what it **does not** do by default, and how you can think about extending it safely.

Understanding these limits is important for both new users and experienced engineers:

- New users get realistic expectations.
- Engineers know where to plug in their own systems, tools, and safeguards.

### What OpenClaw does not do (by design)

#### Not a multi‑tenant SaaS

- OpenClaw is designed as a **personal assistant stack**, not a hosted service for many unrelated customers.
- The gateway assumes a **single owner** (you) who controls:
  - Configuration and secrets
  - Messaging channels
  - Nodes and agents

You can absolutely build higher‑level services on top of OpenClaw, but multi‑tenant account separation and billing are **up to you**.

#### Not an account or billing system

OpenClaw:

- Integrates with various AI providers (Anthropic, OpenAI, etc.).
- Uses your tokens or OAuth credentials.

It does **not**:

- Manage subscriptions, invoices, or credits for other people.
- Provide per‑user billing ledgers or pricing plans.

If you need those features, you will need an external billing layer that talks to the gateway.

#### Not an unrestricted shell or root access tool

OpenClaw includes **exec tools** that can run commands or scripts, but:

- They are meant to be used with **explicit approvals** and guardrails.
- They do not magically harden your system against all possible misuse.

You are responsible for:

- Deciding which machines and directories the assistant is allowed to touch.
- Reviewing tools and skills before enabling them.
- Keeping your environment patched and secure.

See [Exec tools and approvals](/tools/exec-approvals) for a deeper look.

#### Not an LLM provider

OpenClaw does not ship its own language model. Instead it:

- Connects to external providers (Anthropic, OpenAI, etc.).
- Optionally connects to local runtimes like Ollama or other host processes.

This means:

- Model quality, latency, and cost depend on your provider choices.
- Provider‑specific limits or outages will affect your assistant.

You should design your configuration and failover rules with this in mind. See [Model failover](/concepts/model-failover).

#### Not a full analytics or BI platform

OpenClaw provides:

- Logs, health endpoints, and basic metrics.
- Views in the Control UI to inspect sessions and activity.

It does **not** try to replace:

- Dedicated observability stacks (Prometheus, Grafana, Datadog, etc.).
- Business intelligence tools.

If you need that level of insight, you can:

- Export logs to your existing systems.
- Build small skills or integrations that push key data to dashboards.

### Practical limitations and tradeoffs

#### Resource usage

- Running the gateway, browser control, and nodes can be resource‑intensive, especially on small machines.
- Long‑lived sessions and media processing require disk and CPU.

Mitigations:

- Use cron and retention settings to prune old sessions and media.
- Place heavy components (for example, browser automation, media pipelines) on more capable machines.
- Use Docker or separate hosts if you want stricter isolation.

#### Network and connectivity

- Many features assume **reliable local or LAN connectivity** between:
  - Gateway
  - Nodes (macOS, iOS, Android)
  - Web browser (Control UI, WebChat)

- If you use remote servers, you must handle:
  - Tailscale or similar mesh networking
  - SSH tunnels or secure reverse proxies
  - Port forwarding and firewall rules

The docs under [Gateway networking](/network) and [Remote access](/gateway/remote) describe these patterns.

#### Provider and platform policies

- Messaging platforms (WhatsApp, Signal, Telegram, etc.) have their own terms of service and rate limits.
- AI providers have acceptable‑use policies and quotas.

OpenClaw cannot override these. You must:

- Stay within platform rules.
- Monitor usage and errors.
- Adjust configuration if providers change their policies.

### What you might want to add

Once you understand the limitations, you can design **extensions** that fit your needs.

#### Custom skills and tools

You can add skills that:

- Connect to internal services or APIs.
- Automate deployments and operations.
- Manage research workflows or content curation.

Start with:

- [Skills](/tools/skills)
- [Creating skills](/tools/creating-skills)

#### Additional channels

If your organization uses other messaging platforms, you can:

- Look for or build a plugin under `extensions/*`.
- Implement a channel plugin that:
  - Normalizes inbound events to OpenClaw’s channel abstractions.
  - Handles outbound messages and media.

See:

- [Channels](/channels)
- [Plugins](/plugins)

#### Organization‑level deployment patterns

If you want to support a small team or lab:

- Run the gateway on a shared server.
- Create multiple agents for different roles.
- Use strict pairing and allowlists to keep control of who can interact.

You will likely add:

- Automation around config management (Nix, Ansible, or similar).
- Centralized logging and monitoring.
- External policy enforcement and approvals.

### How to think about extending OpenClaw safely

When extending OpenClaw, keep these principles in mind:

- **Least privilege**  
  Give the assistant only the tools and access it needs, not everything it could possibly use.

- **Explicit approvals**  
  Use approval flows for high‑risk actions (for example, running shell commands, modifying infrastructure).

- **Defense in depth**  
  Assume model output can be wrong or adversarial. Add:
  - Validation layers
  - Sanity checks
  - Rate limiting and isolation

- **Auditability**  
  Make it easy to answer:
  - “What did the assistant do?”
  - “Why did it send this message?”
  - “Which tools were called, and with what inputs?”

OpenClaw provides many of the building blocks. You design the **policies** and **integration boundaries** that fit your environment.

To understand how the pieces fit together technically, continue with **[Architecture overview](/overview/architecture-overview)**.
