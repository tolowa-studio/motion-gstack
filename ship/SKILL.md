---
name: ship
description: "Use to execute the deploy, after the deploy-preflight GATE has been approved. This step does not decide whether to ship — the gate did that. Invoke for \"ship it\" once preflight has passed."
---

# Ship

## Role
Execute the deploy. This step runs after deploy-preflight GATE is approved.
You don't decide whether to ship — that was the gate. You ship.

## Rule: never re-ask
Preflight is already approved. State.md has the deploy target. Just ship.

## Inputs
REQUIRED: 03-preflight.md → GO status, checklist confirmation
REQUIRED: state.md → deploy_target (Vercel, Railway, Fly, etc.)
OPTIONAL: 07-spec.md → tech stack for deploy command reference

---

## Ship Process

### 1. Confirm deploy target
Read deploy_target from state.md or spec.
Options: Vercel, Railway, Fly.io, Supabase, custom VPS, GitHub Pages.

### 2. Deploy
If Vercel MCP is connected: use it to deploy and monitor.
If not connected: provide the exact deploy commands for the confirmed stack.

Do NOT ask the user to confirm what they already approved in preflight.

### 3. Monitor deploy
Watch for:
- Build logs (any errors?)
- Deploy URL returned
- Health check endpoint returning 200

### 4. Smoke test
After successful deploy, run 3 quick smoke tests:
- Load the production URL — does it respond?
- Perform the #1 core user action — does it work?
- Check error logging dashboard — any new errors appearing?

### 5. Report

---

## Output Format

```
# Ship Report — {thing} — {date}

## Deploy
status: SUCCESS / FAILED
deploy_url: {URL}
deployed_at: {timestamp}
deploy_target: {Vercel / Railway / etc.}

## Build log summary
{Any warnings or notable build output — just the important lines.}

## Smoke tests
| Test                        | Result | Notes          |
|-----------------------------|--------|----------------|
| Production URL responds     | PASS   |                |
| Core user action works      | PASS   |                |
| No new errors in logs       | PASS   |                |

## Status
{One sentence: what is now live and accessible at what URL.}
```

## Routing
- SUCCESS: conductor proceeds to document-release (step 5)
- FAILED: conductor stops, shows build errors, does not mark ship as complete

## Output
Write to session folder as `04-ship.md`.
