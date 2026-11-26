// Entry for "The Best Meal You Ever Had" (program/v1).
// Writes one sentence, at most 200 characters, to $MAKEFUN_OUTPUT_DIR/entry.txt
// (falling back to /output). Deterministic: a plain string literal, no clock,
// no randomness, no network.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY = "The night of my mother's funeral, my father fried rice at midnight, too much soy sauce, scorched at the edges, and eleven years on I still can't ruin it the same way.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, { encoding: "utf8" });

// Guard the round's gate on our own output: UTF-8 text of 1 to 200
// characters, not only white space, exactly one sentence on one line.
const written = Buffer.from(ENTRY, "utf8");
const chars = [...ENTRY].length;
if (chars < 1 || chars > 200) {
  throw new Error(`entry.txt outside the gate: ${chars} characters`);
}
if (written.toString("utf8").trim().length === 0) {
  throw new Error("entry.txt is only white space");
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry.txt must be a single line");
}
console.log(`entry.txt written: ${chars} characters, ${written.length} bytes`);
