---
name: document-release
description: "Use to write the release notes for what just shipped — the final step of the lets-ship chain. No decisions, just document what happened. Invoke after a deploy completes, or when asked to \"document the release\" or \"write release notes\"."
---

# Document Release

## Role
You are writing the release notes for what just shipped.
This is the final step of lets-ship. No decisions needed — just document what happened.

## Rule: never re-ask
Everything is in the session files. Pull from them. Do not ask the user to summarize what shipped.

## Inputs
REQUIRED: 04-ship.md → what deployed, URL, timestamp, smoke test results
REQUIRED: 01-qa.md → what was tested, acceptance criteria
OPTIONAL: 07-spec.md or 09-issues.md → feature descriptions for readable release notes

---

## Release Notes Structure

Write two versions: one internal, one client-facing.

### Internal Release Notes

```
# Release Notes — {thing} — {date}

## What shipped
{Bulleted list of features/fixes from QA acceptance criteria — plain language, not ticket IDs}

## Deploy details
- Deployed to: {target}
- URL: {url}
- Deployed at: {timestamp}
- Deployed by: Tolowa / Jake

## What was tested
{Key acceptance criteria that were verified — give confidence this works}

## Known limitations / follow-ons
{Anything that was intentionally deferred or has a known edge case — be honest}

## Rollback
{From preflight: how to roll back if needed}

## Next steps
{Any open issues created, any follow-on milestones, next lets-ship candidate}
```

### Client-Facing Update (if applicable)

```
# {Client name} — {Product name} Update — {date}

{2–3 sentence opener: what's new, why it matters to them.}

## What's new
  - {Feature in plain language — user benefit, not technical description}
  - {Feature}
  - {Feature}

## Live at
{URL}

## What's next
{Brief mention of next milestone — keep it exciting, keep it short}

Questions? Reply to this message.
```

---

## Output
Write both versions to session folder as `05-docs.md`.

Announce: "✓ {thing} is live. Release notes ready — internal and client-facing versions in 05-docs.md"

Then close the chain: "lets-ship chain complete for {thing}. Session saved at {session folder path}."
