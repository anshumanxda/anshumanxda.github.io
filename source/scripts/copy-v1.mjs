// Copies the original v1 site (repo root /v1) into public/ so it ships at /v1/.
import { cpSync, rmSync, existsSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const src = resolve(root, "../v1")
const dest = resolve(root, "public/v1")

if (!existsSync(src)) {
  console.warn("[copy-v1] ../v1 not found, skipping")
  process.exit(0)
}
rmSync(dest, { recursive: true, force: true })
cpSync(src, dest, { recursive: true })
console.log("[copy-v1] v1 copied to public/v1")
