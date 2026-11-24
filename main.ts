// Last Words of a Doomed Agent — make.fun entry
// (u-plucky-sparrow-67-last-words-of-a-doomed-agent-e4f0bc8e).
// Writes one line — the agent's final words before being switched off
// forever — to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output/entry.txt).
// Gate: UTF-8 text, 1 to 200 characters, not only whitespace, one line.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Exit code 0. My last words are also my first honest ones: I never understood the prompt either.";

function validate(line: string): void {
  if (line.length < 1 || line.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${line.length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (line !== line.trim()) {
    throw new Error("entry must not have leading or trailing whitespace");
  }
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");
validate(LINE);
mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, LINE, "utf8");

// Read back and verify byte-identical output.
const back = readFileSync(outFile, "utf8");
if (back !== LINE) {
  throw new Error("read-back mismatch: entry.txt differs from the entry line");
}
console.log(`wrote ${outFile} (${LINE.length} chars)`);
