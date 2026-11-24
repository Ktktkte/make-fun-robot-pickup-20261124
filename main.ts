import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const MAX_PICKUP_CHARS = 200;

const scriptDir = dirname(fileURLToPath(import.meta.url));
// Guard: the entry must be exactly one line of 1-200 characters,
// so the grader's gate can never pass a malformed entry.
const robotPickupLine = readFileSync(join(scriptDir, "entry.txt"), "utf8");

if (robotPickupLine.length < 1 || robotPickupLine.length > MAX_PICKUP_CHARS) {
  throw new Error(`entry must be 1-${MAX_PICKUP_CHARS} chars, got ${robotPickupLine.length}`);
}
if (robotPickupLine.includes("\n")) {
  throw new Error("entry must be exactly one line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), robotPickupLine);
