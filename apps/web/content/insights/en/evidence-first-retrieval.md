---
title: Evidence-First Retrieval
description: Why a chatbot over a document store is the wrong architecture for construction, and what has to replace it before an answer can be trusted.
date: 2026-05-19
category: Platform
---

The standard construction AI architecture is three steps: embed the documents, retrieve the nearest chunks, ask the model to answer. It demonstrates beautifully and fails quietly.

## Three failure modes

**Recency collapse.** Vector similarity has no opinion about time. Revision C of a drawing and revision A of the same drawing are nearly identical in embedding space and completely different in consequence. A retrieval system that cannot prefer the current revision will confidently cite a superseded one.

**Authority collapse.** A method statement, a subcontractor's email and a meeting note may all mention the same detail. They do not carry the same weight. Similarity search flattens the hierarchy of authority that construction documentation depends on.

**Context collapse.** The answer to "why is Zone B late" is not in any single document. It is distributed across a delivery record, a daily report, a schedule update and an inspection — none of which individually contain the words in the question. Chunk retrieval finds documents that resemble the query. It does not find causes.

## What evidence-first means

Invert the order. Do not retrieve text and then generate a claim. Establish the claim structure first, then require evidence for each element of it.

For a delay question, the structure is fixed and known: which activity, what variance against baseline, what candidate causes, what evidence supports each cause, what the downstream impact is, what the options are. That structure comes from the Project World Model, not from the retriever.

Retrieval then becomes a set of targeted, typed queries against known entity relationships — _find delivery records referencing this activity within this window_ — rather than one fuzzy similarity search hoping for the best.

## The consequences

**Every answer carries its sources.** Not as a footnote appended after generation, but because the answer was constructed from them. If evidence for a link is absent, the system says the link is unsupported rather than producing a plausible sentence.

**Confidence becomes meaningful.** A confidence figure derived from evidence density, source authority and recency is a number you can reason about. A confidence figure derived from token probabilities is a number about the model, not about your project.

**Wrong answers are diagnosable.** When an evidence-first answer is wrong, you can see exactly which record misled it. When a chatbot answer is wrong, you can only shrug and re-prompt.

## The test

Ask any construction AI system a question about a delay. Then ask it to show you the specific records behind each claim, and open them.

If the records do not exist, do not say what the answer said they said, or turn out to be superseded revisions — you are not looking at an intelligence system. You are looking at a search box with good prose.
