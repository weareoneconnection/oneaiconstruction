---
title: Governing AI Agents on Capital Projects
description: Autonomy is not the goal. A governance model for construction agents — permissions, approval gates, evidence requirements and the audit trail that makes them defensible.
date: 2026-06-30
category: Governance
---

The question executives ask about construction agents is never "can it do the task." It is "what happens when it is wrong, and who is answerable."

That question deserves a better answer than a confidence score.

## Autonomy is the wrong axis

Vendor demos tend to present agent capability as a slider from _assists_ to _acts independently_, with independence as the aspiration. On a capital project this framing is close to useless. The relevant question is not how much the agent does on its own. It is **which class of decision it is touching.**

We separate three:

**Reversible and low-consequence.** Retrieving evidence, drafting a summary, classifying a document, flagging an anomaly. Wrong output costs a few minutes. Agents operate freely here.

**Reversible but consequential.** Proposing a resequence, drafting an RFI response, assembling a delay narrative. Wrong output costs credibility and rework. Agents produce; humans review before anything leaves the system.

**Irreversible or contractually significant.** Anything that enters the contractual record, commits resources, or forms the basis of a claim. Agents never execute these. They prepare them, with evidence attached, for a named human to approve.

The slider is not a slider. It is a set of gates.

## Four requirements

**1. Scoped permissions.** An agent operates within a project, a package, a role and a tool set. It cannot read what its principal cannot read. This sounds obvious and is routinely violated by systems that index everything into one vector store.

**2. Evidence before conclusion.** No claim without a traceable source. If the agent cannot cite the record that supports a statement, the statement does not get made. This is a hard constraint in the architecture, not a prompt instruction — prompt instructions are suggestions, and this cannot be a suggestion.

**3. Explicit approval, explicitly recorded.** Not a checkbox at the end of a workflow. A named person, a timestamp, the exact artefact approved, and the evidence set that was visible at the moment of approval. Approval that cannot be reconstructed later is not governance.

**4. The complete trail.** What the agent observed, how it reasoned, what it recommended, who approved, what was executed, and what actually happened. Including the recommendations that were rejected — those are often the most valuable record you have when a dispute arrives.

## Why this makes agents more useful, not less

There is a persistent assumption that governance is a tax on capability. On capital projects the opposite holds.

An ungoverned agent produces output nobody will stake a decision on. It gets used for drafting and abandoned for anything that matters. A governed agent produces output with its justification attached — which is precisely the form in which a project director can act on it immediately.

Constraint is what makes the output usable. The audit trail is not the compliance overhead around the product. On a project where every significant decision may eventually be examined by a claims consultant, it _is_ the product.
