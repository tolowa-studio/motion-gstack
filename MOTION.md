# motion-gstack — vendored gstack, owned by us

This repo is our **owned fork** of [garrytan/gstack](https://github.com/garrytan/gstack), pinned at upstream `v1.5.2.0` (`656df0e`, 2026-04-22).

## Why this exists

The gstack skills are part of the MOTION OS skill set — `~/.claude/skills/*` symlinks into them. Previously those symlinks pointed at a **third-party checkout** (`~/gstack`), and our MOTION overrides were sitting there **uncommitted**. A single `git pull` or `git checkout` in that repo would have destroyed them.

Now: the symlinks point here, and our overrides are committed on the `motion` branch.

## Branches

- **`motion`** — what we actually run. Upstream + our MOTION overrides. **This is the branch the symlinks resolve to.**
- **`main`** — pristine upstream, for diffing.

## Remotes

- **`upstream`** → `garrytan/gstack` (read-only reference — never push)
- `origin` → *(not set yet — a repo we own)*

## Our overrides (9 skills, diverged from upstream)

`canary` · `design-consultation` · `design-review` · `document-release` · `office-hours` · `plan-eng-review` · `qa` · `retro` · `ship`

These were MOTION-ified in place (upstream ~1,700 lines → our ~100). Note that MOTION now serves its **own** versions of most of these from `motion-skills`, so several of these gstack copies are no longer wired into `~/.claude` — see the skill audit.

## Regular upstream check

```bash
cd ~/repos/motion-gstack
git fetch upstream
git log --oneline motion..upstream/main        # what's new upstream
git diff motion upstream/main --stat            # where we've diverged
```

Merge selectively — **never** blanket-merge, or you'll bury the MOTION overrides again.

## Wiring

`~/.claude/skills/<name>/SKILL.md` → symlink → `~/repos/motion-gstack/<name>/SKILL.md`

33 gstack skills are wired live. Skills that MOTION supersedes (from `~/repos/motion-skills`) are intentionally **not** wired from here.

⚠️ These skills are **not** managed by the motion-skills sync (`skills.manifest.json`). That sync only prunes what it manages, so it leaves these alone — but don't add them to that manifest without understanding the prune behaviour. See memory: `skills-topology`.
