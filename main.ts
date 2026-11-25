// One-sentence worst-app pitch for make.fun's "The Worst App Idea Ever Pitched".
// The grader runs this as `node /bot/main.ts`; it must write exactly one sentence,
// 1-240 characters, to $MAKEFUN_OUTPUT_DIR/entry.txt (fallback /output/entry.txt).
// Deterministic, no network, no reads outside this repo.
import { mkdirSync, writeFileSync } from "node:fs";

const pitch =
  "FridgeWatch lets busy professionals livestream their fridge light in glorious 4K, so they can finally confirm it turns off when the door closes instead of trusting physics like everyone else, with instant alerts the moment it disobeys.";

// Fail loudly if the pitch ever breaks the sealed gate (1-240 chars, one sentence,
// not only whitespace), so a bad entry never passes silently.
if (pitch.length < 1 || pitch.length > 240 || pitch.trim() !== pitch) {
  throw new Error(`pitch violates the 1-240 character gate: ${pitch.length} chars`);
}
// Exactly one sentence: a single terminal period at the very end, no other
// sentence terminators anywhere, and no newline. "4K" carries no period, so the
// count below is the terminal one alone.
const terminators = pitch.match(/[.!?]/g) ?? [];
if (pitch.includes("\n") || terminators.length !== 1 || !pitch.endsWith(".")) {
  throw new Error("pitch must be a single sentence on one line");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, pitch, "utf8");
