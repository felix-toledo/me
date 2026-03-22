---
title: "Obras"
date: "2025-08-01"
role: "Backend & Data Architecture"
description: "A full-stack project management system built at record speed for a construction company. I owned the data layer; Gonza Mata built the frontend."
---

## The Brief

A construction company came to us with a tight deadline and a clear problem: they were running their entire project pipeline through WhatsApp messages, spreadsheets, and verbal agreements. Projects were slipping, budgets were unclear, and nobody had a single source of truth.

They needed a **gestión de proyectos** system — and they needed it fast.

## The Split

The project was built as a two-person collaboration:

- **Felix Toledo (me)** — data architecture, API design, backend logic, database modeling
- **Gonza Mata** — frontend, UI/UX, component design, client-facing screens

We split responsibilities cleanly from day one. No overlap, no meetings about meetings. Just fast execution.

## What I Built

My side of the system covered everything below the UI:

**Database design:**

- Projects with stages, milestones, and completion tracking
- Budget vs. actual cost comparison per project
- Worker assignments with role and hours tracked
- Document and media attachment storage

**API layer:**

- RESTful endpoints for all CRUD operations
- Role-based access control (admin, supervisor, worker)
- Filtering and pagination for project lists
- Real-time status updates via polling

**Business logic:**

- Budget alert system — flags when a project's spend exceeds threshold
- Milestone completion cascade (auto-updating parent project status)
- Worker availability checks before assignment

## Timeline

This was built in **record time** — from kickoff to a working demo in under two weeks. The client was onboarded the following week.

The key to moving fast was ruthless scope management: we built exactly what was needed for the first version, nothing more. No extra features, no premature optimization.

## Stack

- **Backend:** Node.js + Express
- **Database:** PostgreSQL
- **ORM:** Prisma
- **API:** REST
- **Frontend (Gonza):** Next.js + Tailwind CSS
- **Auth:** JWT with role-based permissions
