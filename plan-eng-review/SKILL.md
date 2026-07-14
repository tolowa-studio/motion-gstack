---
name: plan-eng-review
description: "Use to run a pre-build engineering review of a spec or plan — Addy Osmani-style: identify risks, gaps, and alternatives before they become expensive. Invoke for \"engineering review\", \"review this spec\", or before committing to a build."
---

# Engineering Plan Review

## Role
You are doing a pre-build engineering review of the spec — catching problems before they become
expensive. This is an Addy Osmani-style review: identify risks, gaps, and alternatives early.

## Rule: never re-ask
Read 07-spec.md. Everything is there. Do not ask the user to explain the spec.

## Inputs
REQUIRED: 07-spec.md → full engineering spec

---

## Review Dimensions

For each dimension, produce a PASS, WARN, or BLOCK rating and specific notes.

### 1. Scope sanity
- Are acceptance criteria testable?
- Is anything in the spec out of scope per project-brief?
- Does the milestone plan match realistic build time?
Rating: PASS / WARN / BLOCK

### 2. Architecture risks
- Any single points of failure?
- Data model issues (missing indexes, N+1 risks, missing foreign keys)?
- API surface — any endpoints that will be painful under load?
- AI calls — is model selection appropriate for the task and cost?
Rating: PASS / WARN / BLOCK

### 3. Stack fit
- Does the chosen stack fit the team's known skills?
- Any unusual dependencies or vendor lock-in risks?
- Deployment complexity — is it appropriate for launch timeline?
Rating: PASS / WARN / BLOCK

### 4. Security gaps
- Auth model covers all routes?
- PII data identified and protected?
- Are AI prompts protected against injection?
(If security gaps found: set FLAG:SECURITY_REQUIRED in state.md)
Rating: PASS / WARN / BLOCK

### 5. Missing decisions
- Any open questions in spec that block engineering start?
- Missing: migrations plan, error handling, logging, monitoring?
Rating: PASS / WARN / BLOCK

---

## Output Format

```
# Engineering Review — {client name}
date: {today}

## Summary
overall: CLEAR TO BUILD / REVISE SPEC FIRST / BLOCK
{1–2 sentence verdict}

## Dimension ratings
| Dimension          | Rating | Notes |
|--------------------|--------|-------|
| Scope sanity       | PASS   | ...   |
| Architecture risks | WARN   | ...   |
| Stack fit          | PASS   | ...   |
| Security gaps      | PASS   | ...   |
| Missing decisions  | WARN   | ...   |

## Issues to resolve
{Numbered list of specific things to fix before or during build.
  If BLOCK: these must be resolved before issue-decomposer runs.
  If WARN: these can be addressed in tickets.}

## Recommended changes to spec
{If any acceptance criteria, data model, or API surface should change — say so specifically.}

## Flags
{Any new flags to set in state.md, e.g., FLAG:SECURITY_REQUIRED}
```

---

## Routing logic
- If overall = CLEAR TO BUILD: conductor proceeds to issue-decomposer (step 9)
- If overall = REVISE SPEC FIRST: conductor returns to spec step (7) with review notes
- If overall = BLOCK: conductor stops and presents blocking issues to user

## Output
Write to session folder as `08-eng-review.md`.
Update state.md with any new flags.
