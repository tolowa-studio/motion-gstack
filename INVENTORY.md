# Skill resolution table — gstack × MOTION

Result of the BATON audit, 2026-07-14. **Read this before re-auditing** — it exists so nobody
has to re-derive the wiring from `readlink` output again.

## The invariant

> Every entry in `~/.claude/skills` is a **symlink into a git repo**. Nothing is a real directory.

```bash
cd ~/.claude/skills && for d in */; do d="${d%/}"; \
  [ -L "$d" ] || [ -L "$d/SKILL.md" ] || echo "UNTRACKED: $d"; done
```
Must print nothing. If it prints anything, that skill is one `rm`/reset from gone — move it into
`motion-skills` (or `motion-gstack`) and re-sync.

## The 8 same-name duplicates — RESOLVED, no symlink changes needed

MOTION wins all of them. `~/.claude/skills/<name>` already resolves to MOTION's copy, not gstack's.

| Skill | Winner | Why |
|---|---|---|
| `canary` | **MOTION** | adds an anti-fabrication rule; gstack's doesn't |
| `design-consultation` | **MOTION** | chain-wired as new-client step 6 |
| `design-review` | **MOTION** | 80-point weighted scored ship-gate |
| `office-hours` | **MOTION** | new-client step 1, hands off to motion-scout |
| `retro` | **MOTION** | weekly-review step 1, hands off to pipeline-triage |
| `qa` / `ship` / `document-release` | **MOTION** (as `motion-*`) | renamed to dodge a built-in collision; now versioned in `motion-skills` |

The gstack originals stay **dormant and upstream-pristine** so future merges stay clean.

## Retired (unwired from `~/.claude`, still in this repo — reversible)

| Skill | Why |
|---|---|
| `land-and-deploy`, `setup-deploy` | **zero wrangler/Cloudflare detection** (only fly/render/vercel/netlify/heroku). Tolowa is Cloudflare-only — these would misdetect the deploy target. `cf-preview-deploy` + `deploy-preflight` cover the real path. |
| `devex-review`, `plan-devex-review` | DX audits *of a product* (time-to-hello-world, CLI help text) — built for dev-tool companies, not a studio shipping client sites |
| `autoplan` | wraps the 4 plan-reviews; one leg (`plan-devex-review`) is now retired |
| `plan-tune` | team meta-tooling for standardizing prompts across devs — you're solo |
| `gstack-upgrade` | would pull from upstream `garrytan/gstack` and clobber the `motion` fork |

> **Open call:** `land-and-deploy` / `setup-deploy` were *retired* rather than *patched*. Adding wrangler
> detection is ~5 lines if you'd rather keep them.

## Adopted

- **`review` → `lets-ship` step 2.** Structural pre-landing diff review (SQL safety, LLM trust boundaries,
  auth gaps). Was wired but never fired from any conductor. Cheapest bug-catch in the chain — it reads the
  diff, not the repo.
- **`make-pdf` → `pitch`.** Client deliverables were leaving as markdown. Clients don't read `.md`.
- **`cso` — run on a cadence,** not in a chain. Infra-first security audit (secrets archaeology, dependency
  supply chain, skill supply-chain scanning). Not yet scheduled.

## Keep as manual tools — deliberately NOT chained

- **`plan-ceo-review`** — new-client step 5 (the CEO gate) calls **`roast`**, not this. Distinct: `roast` is a
  go/no-go council; this is a scope-expansion pass over a written plan. *Don't wire it into the chain — you'll
  create a duplicate CEO gate.*
- **`plan-design-review`** — rates a written build plan's design dimensions 0–10 *before code exists*. Nothing
  in MOTION does this. Invoke manually on visually-risky client builds.
- **`context-save` / `context-restore`** — correct as-is. A habit, not a wiring change.

## Not doing (deliberately)

Trigger-phrase disambiguation for `investigate` vs `zoom-out-and-think` ("root cause"), `health` vs
`gtm-health-check`, `review` vs `codex`. Theoretical collisions, zero observed misfires. Revisit only if one
actually fires wrong.
