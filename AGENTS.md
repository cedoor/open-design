# open-design project

Design workspace for [cedoor/open-design](https://github.com/cedoor/open-design).

- `open-design/` is the vendored harness (gitignored). Update with `bun run harness:update`.
- Build all prototypes in `prototypes/` (gitignored, local-only).
- Skills in `open-design/skills/` (auto-loaded); brand contract from `open-design/design-systems/`; blueprints in `open-design/design-templates/`.
- Workflow: pick the closest skill and follow it; choose a design system first; `od: mode: image` skills need an external provider, else fall back to CSS/SVG.
- Browser testing: prefer OpenCode native browser tools; fallback to `agent-browser` (`bunx agent-browser ...`). After fresh `bun install`, run `bunx agent-browser install` once for Chrome.
