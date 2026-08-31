# open-design project

Design workspace for [cedoor/open-design](https://github.com/cedoor/open-design). OpenCode is scoped to this project only:

- `opencode.jsonc` — project config: `skills.paths` → `open-design/skills`, `references` → design systems and templates.
- `.opencode/agent/designer.md` — `designer`, the primary agent of this project (the only one with access to the skill library).
- `open-design/` — vendored OpenDesign harness (gitignored; update procedure below).
- `agent-browser` — devDependency for screenshotting and testing HTML prototypes (`bunx agent-browser ...`); browser binary in `~/.agent-browser/`. After a fresh `bun install`, run `bunx agent-browser install` once to download Chrome (bun blocks the package postinstall).

The harness lives only here: nothing is registered in the global `~/.config/opencode` config, so other projects see no open-design skills or agents.

## Updating the harness

Update the vendored harness from upstream ([nexu-io/open-design](https://github.com/nexu-io/open-design)):

```sh
bun run harness:update
```

The script (`scripts/update-harness.ts`) sparse-clones upstream into a temp dir, rsyncs the four folders (`skills`, `design-systems`, `design-templates`, `prompt-templates`) into `open-design/`, then cleans up.

No OpenCode restart needed for skill/template file changes; restart only if `opencode.jsonc` paths change.
