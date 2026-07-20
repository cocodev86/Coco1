import { access, readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const read = (file) => readFile(path.join(root, file), "utf8");
const failures = [];

function requireMatch(source, pattern, message) {
  if (!pattern.test(source)) failures.push(message);
}

const layout = await read("app/layout.tsx");
requireMatch(layout, /metadataBase:\s*new URL\(brand\.url\)/, "Root metadata must define metadataBase from brand.url.");
requireMatch(layout, /title:\s*\{[\s\S]*default:[\s\S]*template:/, "Root metadata must define a title default and template.");
requireMatch(layout, /alternates:\s*\{\s*canonical:/, "Root metadata must define a canonical URL.");
requireMatch(layout, /openGraph:\s*\{/, "Root metadata must define Open Graph metadata.");
requireMatch(layout, /twitter:\s*\{/, "Root metadata must define Twitter metadata.");
requireMatch(layout, /robots:\s*\{/, "Root metadata must define robots directives.");
requireMatch(layout, /\/opengraph-image/, "Root Open Graph metadata must use the raster image route.");
requireMatch(layout, /\/twitter-image/, "Root Twitter metadata must use the raster image route.");

const helper = await read("lib/metadata.ts");
requireMatch(helper, /alternates:\s*\{\s*canonical\s*\}/, "Metadata helper must emit a canonical URL.");
requireMatch(helper, /url:\s*canonical/, "Metadata helper must emit route-correct Open Graph URLs.");
requireMatch(helper, /summary_large_image/, "Metadata helper must emit large Twitter cards.");

const openGraphImage = await read("app/opengraph-image.tsx");
requireMatch(openGraphImage, /width:\s*1200/, "Open Graph image width must be 1200 pixels.");
requireMatch(openGraphImage, /height:\s*630/, "Open Graph image height must be 630 pixels.");
requireMatch(openGraphImage, /contentType\s*=\s*"image\/png"/, "Open Graph image must render as PNG.");

for (const file of ["app/twitter-image.tsx", "app/robots.ts", "app/sitemap.ts"]) {
  try {
    await access(path.join(root, file));
  } catch {
    failures.push(`${file} is required.`);
  }
}

if (/openGraph[\s\S]{0,500}\.svg/i.test(layout) || /twitter[\s\S]{0,500}\.svg/i.test(layout)) {
  failures.push("Social preview metadata must not reference SVG images.");
}

if (failures.length > 0) {
  console.error("Metadata validation failed:\n");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Metadata foundation validation passed.");
