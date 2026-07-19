import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const packageJson = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8"));

test("repository exposes required validation commands", () => {
  for (const script of ["build", "lint", "typecheck", "test", "validate"]) {
    assert.equal(typeof packageJson.scripts?.[script], "string");
    assert.ok(packageJson.scripts[script].length > 0);
  }
});

test("repository requires a supported Node.js runtime", () => {
  assert.match(packageJson.engines?.node ?? "", /20/);
});
