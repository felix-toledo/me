---
title: "Sierra Ski Tech"
date: "2023-02-10"
role: "Developer / Ski Instructor"
description: "An internal scheduling tool I built while working as a ski instructor. Shipped in days, adopted by the team immediately."
---

## Identifying the Bottleneck

While working as a **ski instructor at Sierra at Tahoe**, I noticed a significant operational bottleneck. Coordinating instructor schedules, student assignments, and class tracking was causing unnecessary friction — and wasting time on the snow.

Every morning, the team gathered around printed sheets and whiteboards to figure out who was teaching what class, at what level, and where. It was 2023 and we were running on clipboards.

## The Ski Binding Calculator

The core feature was a **Ski Binding Calculator** — a tool ski technicians use daily. Given a student's data (age, weight, height, skier type, sole length), it computes the correct **DIN binding indicator setting** and skier code, which determines how easily a binding releases in a fall.

This calculation follows strict international standards (ISO 11088). Getting it wrong is a safety risk. The existing process was manual table lookups — slow and error-prone.

The app automates this entirely:

1. Instructor enters student data (age, weight, height, skier type, sole length)
2. App computes the DIN setting instantly using the ISO lookup table
3. Output is displayed with the skier code and indicator setting to configure on the physical binding

## The Quick Fix

I spun up **Sierra Ski Tech** as a lightweight internal tool designed specifically to fix this logistical headache. No over-engineering — just a fast, functional React app that solved the exact problem.

The tool:

- Automated the **DIN binding calculation** used by ski technicians
- Removed the need for manual ISO table lookups
- Reduced errors in a safety-critical workflow
- Ran on a tablet at the rental shop with zero setup friction

## Impact

It wasn't about building massive enterprise software. It was about **shipping a functional fix fast**. The tool reduced downtime, cut errors in binding configuration, and let the team focus on what actually mattered: teaching and skiing.

A perfect example of identifying a real-world problem and solving it with code — even when that's not your job title.

## Stack

- **Framework:** React
- **Styling:** CSS Modules
- **Logic:** ISO 11088 DIN calculation algorithm
- **Deploy:** Static hosting (internal use)
