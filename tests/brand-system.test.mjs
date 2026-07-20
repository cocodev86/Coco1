import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const packageJson = JSON.parse(
  await readFile(new URL("../package.json", import.meta.url), "utf8"),
);

const brandingSource = await readFile(
  new URL("../lib/brand.ts", import.meta.url),
  "utf8",
);

const homeSource = await readFile(
  new URL("../app/page.tsx", import.meta.url),
  "utf8",
);

const blogSource = await readFile(
  new URL("../app/blog/page.tsx", import.meta.url),
  "utf8",
);

test("repository exposes dedicated brand validation", () => {
  assert.equal(typeof packageJson.scripts?.["validate:brand"], "string");
  assert.match(packageJson.scripts.validate, /validate:brand/);
});

test("brand constants expose canonical color and asset families", () => {
  assert.match(brandingSource, /#6C4CFF/);
  assert.match(brandingSource, /#B7FF2A/);
  assert.match(brandingSource, /horizontalDark/);
  assert.match(brandingSource, /maskable512/);
});

test("public navigation uses reusable brand components", () => {
  assert.match(homeSource, /BrandLink/);
  assert.match(blogSource, /BrandLink/);
  assert.doesNotMatch(homeSource, /<span[^>]*>\s*M\s*<\/span>/i);
  assert.doesNotMatch(blogSource, /<span[^>]*>\s*M\s*<\/span>/i);
});
