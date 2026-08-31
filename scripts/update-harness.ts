#!/usr/bin/env bun
import { execSync } from "node:child_process"
import { mkdtempSync, readdirSync, rmSync } from "node:fs"
import { tmpdir } from "node:os"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const SOURCE_REPO = "https://github.com/nexu-io/open-design.git"
const FOLDERS = ["skills", "design-systems", "design-templates", "prompt-templates"] as const
const TARGET = "open-design"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
const dest = join(root, TARGET)
const tmp = mkdtempSync(join(tmpdir(), "open-design-update-"))

const sh = (cmd: string): void => execSync(cmd, { stdio: "inherit" })

const count = (dir: string, suffix: string): number =>
  readdirSync(join(dest, dir), { recursive: true }).filter((f) => f.endsWith(suffix)).length

try {
  sh(`git clone --depth 1 --filter=blob:none --sparse "${SOURCE_REPO}" "${tmp}/repo"`)
  sh(`git -C "${tmp}/repo" sparse-checkout set ${FOLDERS.join(" ")}`)

  for (const folder of FOLDERS) {
    sh(`rsync -a --delete "${tmp}/repo/${folder}/" "${join(dest, folder)}/"`)
  }

  console.log(
    `\nHarness updated: ${count("skills", "SKILL.md")} skills, ${count("design-systems", "DESIGN.md")} design systems.`,
  )
} finally {
  rmSync(tmp, { recursive: true, force: true })
}
