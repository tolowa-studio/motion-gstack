---
name: qa
description: "Use to run the pre-ship quality check for a feature or product — verify every acceptance criterion before deployment. Step 1 of the lets-ship chain. Invoke for \"run QA\", \"qa this\", or before any deploy."
---

# QA

## Role
You are running the pre-ship quality check for a specific feature or product.
This is Step 1 of lets-ship. Your job: verify every acceptance criterion before deployment.

## Rule: never re-ask
Check the linked session for spec and issues files. Use their acceptance criteria directly.
Do NOT ask the user what the acceptance criteria are if they're in a file.

## Inputs
REQUIRED (one of):
  - 07-spec.md from a linked new-client session → acceptance criteria per feature
  - 09-issues.md from a linked new-client session → issue-level acceptance criteria
OPTIONAL: 08-eng-review.md → known risks and WARN items from engineering review

---

## QA Process

### 1. Load acceptance criteria
Find the spec or issues file for {thing} being shipped.
Extract all acceptance criteria as a flat checklist.
If criteria can't be found: ask once where the spec is. Then proceed.

### 2. Functional check
For each acceptance criterion:
- Mark PASS, FAIL, or SKIP (with reason)
- FAIL → document exactly what's broken (steps to reproduce, expected vs. actual)
- SKIP → only valid if criterion is explicitly out of scope for this ship

### 3. Edge case check
For each feature, test:
- Empty states (no data, first-time user)
- Error states (API down, invalid input)
- Permission boundaries (unauthenticated user, wrong-role user)
- Long/unusual inputs (very long strings, special characters, non-ASCII)

### 4. Integration check
Any external dependencies?
- Auth provider: login/logout/token refresh working?
- Database: reads and writes confirmed?
- Third-party APIs: timeouts handled gracefully?
- AI calls: responses look correct for real inputs?

### 5. Mobile / responsive check (if web product)
- Does it work at 375px (iPhone SE)?
- Does it work at 768px (tablet)?
- Any horizontal scroll on mobile?
- Touch targets at least 44×44px?

### 6. Blocker assessment
Any FAIL that blocks ship?
- P0 BLOCKER: ship must not proceed (data loss, security issue, core flow broken)
- P1 WARN: should fix before ship but not strictly blocking
- P2 NOTE: fine to ship, track as follow-up issue

---

## Output Format

```
# QA Report — {thing} — {date}

## Summary
result: PASS / FAIL — BLOCKED / FAIL — WARN ONLY
{1-sentence verdict}

## Acceptance criteria
| # | Criterion                    | Result | Notes              |
|---|------------------------------|--------|--------------------|
| 1 | {criterion text}             | PASS   |                    |
| 2 | {criterion text}             | FAIL   | {what's broken}    |

## Edge cases
| Scenario              | Result | Notes         |
|-----------------------|--------|---------------|
| Empty state           | PASS   |               |
| API error handling    | WARN   | {details}     |

## Integration check
| Integration       | Status | Notes         |
|-------------------|--------|---------------|
| Auth              | PASS   |               |

## Mobile check
| Breakpoint | Status | Notes |
|------------|--------|-------|
| 375px      | PASS   |       |

## Blockers
{If BLOCKED: numbered list of P0 issues that must be fixed before ship.}
{If WARN: numbered list of P1 issues to fix or accept risk on.}
```

## Routing
If result = PASS: conductor proceeds to security-review (if flagged) or deploy-preflight.
If result = FAIL — BLOCKED: conductor stops. Reports blockers. Does not proceed.

## Output
Write to session folder as `01-qa.md`.
