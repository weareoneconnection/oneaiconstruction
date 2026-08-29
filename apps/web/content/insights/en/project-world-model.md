---
title: The Project World Model
description: Why construction AI fails without a shared semantic layer for entities, activities, evidence, risks and actions — and what that layer has to contain.
date: 2026-08-12
category: Platform
---

Most construction AI projects fail in the same place. Not at the model. At the context.

A large language model pointed at a document repository can summarise an RFI. It cannot tell you that the RFI concerns a connection detail on Roof Zone B, that Roof Zone B sits on the critical path, that the responsible subcontractor has missed two of its last three milestones, or that the same detail was already flagged in an inspection report eleven days ago. Those facts live in five systems that have never been introduced to one another.

## The missing layer

What is missing is not more data. It is a **shared semantic layer** — a representation of the project that every system, every agent and every person can point at and mean the same thing.

We call it the Project World Model. It has five primitives:

**Entities.** The physical and organisational things the project is made of: spaces, systems, assemblies, components, packages, parties. Sourced primarily from IFC/BIM, but not limited to what the model contains.

**Activities.** What happens to entities over time. Baseline, actual, forecast. Sourced from the schedule, but reconciled against what the field actually reports.

**Evidence.** The records that justify a claim about state: daily reports, inspection records, delivery notes, photographs, survey data, sensor readings. Every piece of evidence carries a source, a timestamp and a chain of custody.

**Risks.** Quantified statements about what might happen, each one linked to the drivers that produced it and the evidence that supports those drivers.

**Actions.** Decisions taken, by whom, on what basis, with what approval, and what followed.

## Why the primitives matter

The value is in the edges, not the nodes.

When an entity is linked to its activities, you can answer _what is the physical state of this project right now._ When activities are linked to evidence, you can answer _how do we know._ When risks are linked back through drivers to evidence, you can answer _why should I believe this forecast._ When actions are linked to the risks that prompted them, you have an audit trail that survives a claim.

A dashboard shows you a number. A world model lets you interrogate it.

## The consequence for AI

This is why we treat the model layer as replaceable and the world model as the durable asset. Foundation models will keep improving and keep changing. The semantic representation of your project — what exists, what happened, what justified each conclusion — is what makes any of those models useful on your project rather than on a benchmark.

Build the world model first. The intelligence follows.
