---
title: "Tembiapo App"
date: "2024-05-20"
role: "Lead Developer"
description: "A two-sided marketplace connecting skilled tradespeople with clients across NEA, Argentina. Verified professionals, direct contact, no middlemen."
---

## Connecting Needs with Skills

**"Tembiapo"** loosely translates to _work_ or _labor_ in Guaraní. The core idea behind this platform was simple: bridge the gap between skilled tradespeople — plumbers, electricians, carpenters — and clients who need immediate, reliable help.

The problem was clear in Corrientes: talented professionals had no way to showcase themselves to potential clients, and clients had no trustworthy way to find vetted local workers. Existing platforms (Workana, Fiverr) were too generic and didn’t map to local trust dynamics.

## The Two-Sided Challenge

Building a marketplace means handling **two distinct user experiences simultaneously**:

**For clients:**

- Search professionals by category and city
- View verified profiles with ratings and portfolios
- Contact directly via WhatsApp — no middlemen, no hidden fees

**For professionals:**

- Create a rich profile with portfolio, skills, and service areas
- Receive direct client inquiries
- Build reputation through completed jobs and reviews

The challenge was making both sides feel native — not a generic form, but an experience tailored to how people in the NEA actually hire and work.

## Identity Verification

Trust is the core value proposition. Every professional on Tembiapo goes through a **DNI verification flow** before their profile goes live. This guarantees clients are contacting real, identifiable people — not anonymous accounts.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Database:** PostgreSQL
- **Auth:** Custom session management with DNI verification
- **Hosting:** Vercel + Supabase
- **Contact:** WhatsApp Business API integration

## Current State

The platform is **live at [tembiapo.app](https://tembiapo.app)** with real professionals and clients across Corrientes, Resistencia, Formosa, and Posadas. Growth has been organic — word of mouth among tradespeople who find real value in having a verified digital presence.
