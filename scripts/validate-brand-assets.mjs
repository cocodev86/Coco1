import { access, readFile, readdir, stat } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";

const root = process.cwd();

const requiredAssets = [
  "public/brand/logos/metaphor-horizontal-dark.svg",
  "public/brand/logos/metaphor-horizontal-light.svg",
  "public/brand/logos/metaphor-horizontal-mono-dark.svg",
  "public/brand/logos/metaphor-horizontal-mono-light.svg",
  "public/brand/logos/metaphor-stacked-dark.svg",
  "public/brand/logos/metaphor-stacked-light.svg",
  "public/brand/logos/metaphor-compact-dark.svg",
  "public/brand/logos/metaphor-compact-light.svg",
  "public/brand/logos/metaphor-wordmark-dark.svg",
  "public/brand/logos/metaphor-wordmark-light.svg",
  "public/brand/logos/metaphor-wordmark-mono.svg",
  "public/brand/logos/metaphor-symbol-color.svg",
  "public/brand/logos/metaphor-symbol-dark.svg",
  "public/brand/logos/metaphor-symbol-light.svg",
  "public/brand/logos/metaphor-symbol-violet.svg",
  "public/brand/logos/metaphor-symbol-outline.svg",
  "public/brand/logos/metaphor-symbol-micro.svg",
  "public/brand/logos/metaphor-monogram.svg",
  "public/brand/favicons/favicon.ico",
  "public/brand/favicons/favicon.svg",
  "public/brand/favicons/favicon-16x16.png",
  "public/brand/favicons/favicon-32x32.png",
  "public/brand/favicons/favicon-48x48.png",
  "public/brand/favicons/apple-touch-icon.png",
  "public/brand/favicons/safari-pinned-tab.svg",
  "public/brand/favicons/mstile-150x150.png",
  "public/brand/favicons/site.webmanifest",
  "public/brand/favicons/browserconfig.xml",
  "public/brand/app-icons/icon-192x192.png",
  "public/brand/app-icons/icon-512x512.png",
  "public/brand/app-icons/icon-1024x1024.png",
  "public/brand/app-icons/maskable-192x192.png",
  "public/brand/app-icons/maskable-512x512.png",
  "public/brand/app-icons/social-avatar-512x512.png",
];

for (const relativePath of requiredAssets) {
  const absolutePath = path.join(root, relativePath);
  await access(absolutePath, constants.R_OK);
  const details = await stat(absolutePath);
  if (!details.isFile() || details.size === 0) {
    throw new Error(`Required brand asset is missing or empty: ${relativePath}`);
  }
}

const logoDirectory = path.join(root, "public/brand/logos");
for (const entry of await readdir(logoDirectory)) {
  if (!entry.endsWith(".svg")) continue;
  const svg = await readFile(path.join(logoDirectory, entry), "utf8");
  if (!/<svg\b/i.test(svg) || !/viewBox=/i.test(svg)) {
    throw new Error(`Logo SVG is missing its SVG root or viewBox: ${entry}`);
  }
  if (/<text\b/i.test(svg) || /font-family=/i.test(svg)) {
    throw new Error(`Logo SVG depends on live text instead of outlined paths: ${entry}`);
  }
}

function pngDimensions(buffer) {
  const signature = buffer.subarray(0, 8).toString("hex");
  if (signature !== "89504e470d0a1a0a") {
    throw new Error("Invalid PNG signature");
  }
  return [buffer.readUInt32BE(16), buffer.readUInt32BE(20)];
}

const expectedPngSizes = new Map([
  ["public/brand/favicons/favicon-16x16.png", 16],
  ["public/brand/favicons/favicon-32x32.png", 32],
  ["public/brand/favicons/favicon-48x48.png", 48],
  ["public/brand/favicons/apple-touch-icon.png", 180],
  ["public/brand/favicons/mstile-150x150.png", 150],
  ["public/brand/app-icons/icon-192x192.png", 192],
  ["public/brand/app-icons/icon-512x512.png", 512],
  ["public/brand/app-icons/icon-1024x1024.png", 1024],
  ["public/brand/app-icons/maskable-192x192.png", 192],
  ["public/brand/app-icons/maskable-512x512.png", 512],
  ["public/brand/app-icons/social-avatar-512x512.png", 512],
]);

for (const [relativePath, expectedSize] of expectedPngSizes) {
  const buffer = await readFile(path.join(root, relativePath));
  const [width, height] = pngDimensions(buffer);
  if (width !== expectedSize || height !== expectedSize) {
    throw new Error(`${relativePath} must be ${expectedSize}x${expectedSize}, found ${width}x${height}`);
  }
}

const manifest = JSON.parse(
  await readFile(path.join(root, "public/brand/favicons/site.webmanifest"), "utf8"),
);
if (manifest.name !== "Metaphor Automation Consulting") {
  throw new Error("Brand manifest has an unexpected application name.");
}
const purposes = new Set((manifest.icons ?? []).map((icon) => icon.purpose));
if (!purposes.has("any") || !purposes.has("maskable")) {
  throw new Error("Brand manifest must include both standard and maskable icons.");
}

async function collectSourceFiles(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await collectSourceFiles(entryPath)));
    else if (/\.(tsx|jsx)$/.test(entry.name)) files.push(entryPath);
  }
  return files;
}

for (const sourceRoot of ["app", "components"]) {
  const directory = path.join(root, sourceRoot);
  for (const file of await collectSourceFiles(directory)) {
    const source = await readFile(file, "utf8");
    if (/<span[^>]*>\s*M\s*<\/span>/i.test(source)) {
      throw new Error(`Placeholder M logo remains in ${path.relative(root, file)}`);
    }
  }
}

for (const integrationFile of ["app/page.tsx", "app/blog/page.tsx"]) {
  const source = await readFile(path.join(root, integrationFile), "utf8");
  if (!source.includes("BrandLink")) {
    throw new Error(`BrandLink is not integrated in ${integrationFile}`);
  }
}

console.log(`Validated ${requiredAssets.length} production brand assets and application integration.`);
