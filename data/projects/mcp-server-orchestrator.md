---
title: "MCP Server-Orchestrator"
date: "2025-10-15"
role: "Full-Stack & AI Integrations"
description: "A privacy-first multi-agent orchestrator that connects LLMs to local tools without leaking context."
---

## The Origin Story

This project didn't start as a massive architectural plan. It began organically while working for a freelance client who needed a way to connect **disparate data sources** to an AI workflow. I started building a custom bridge, but quickly realized the potential was much bigger.

The client needed LLM capabilities hooked into their internal database — without sending sensitive data to third-party APIs. That constraint became the north star of the whole system.

## Scaling Up

As the freelance project wrapped up, I saw an opportunity to standardize this integration using the **Model Context Protocol (MCP)**. I took the core logic and scaled it into a full orchestrator capable of managing multiple local and remote AI agents.

Key capabilities built:

- **Multi-agent routing** — direct prompts to the right agent based on intent
- **Tool registration** — plug in databases, APIs, and file systems as callable tools
- **Context isolation** — each agent session is scoped, preventing data leakage between clients
- **Local-first** — everything runs on the user's own infrastructure

## Architecture

The orchestrator sits between the user and any number of MCP servers. It handles authentication, routing, and response aggregation.

```
User → Orchestrator → MCP Server A (DB tools)
                   → MCP Server B (External APIs)
                   → MCP Server C (File system)
```

Each server exposes a set of **tools** via the MCP spec. The orchestrator resolves which tools to invoke, calls them in parallel when possible, and synthesizes the results back to the LLM.

## The Final Degree Project — "Jarvis"

Today, this orchestrator has evolved into my **final thesis for my B.S. in Information Systems Engineering**. It acts as a local, privacy-first, multi-agent orchestrator — a personal "Jarvis" that connects LLMs securely to local databases, APIs, and file systems without leaking context.

The thesis explores the formal specification of the MCP protocol, the security model of agent communication, and benchmarks against cloud-based alternatives.

## Stack

- **Runtime:** Node.js + TypeScript
- **Protocol:** Model Context Protocol (MCP)
- **LLM Integration:** Ollama (local) + OpenAI-compatible APIs
- **Transport:** stdio and HTTP/SSE
