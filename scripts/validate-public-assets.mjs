import { access, readFile, readdir, stat } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";

const root = process.cwd();
const required = ["app", "docs", "package.json", "tsconfig.json"];

for (const entry of required) {
  await access(path.join(root, entry), constants.R_OK);
}

const packageJson = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));
for (const script of ["build", "lint", "typecheck", "test", "validate"]) {
  if (!packageJson.scripts?.[script]) {
    throw new Error(`Missing required npm script: ${script}`);
  }
}

const publicDir = path.join(root, "public");

async function validateAssetDirectory(directory) {
  const entries = await readdir(directory, { withFileTypes: true });

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      await validateAssetDirectory(entryPath);
      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    const details = await stat(entryPath);
    if (details.size === 0) {
      throw new Error(`Public asset is empty: ${path.relative(root, entryPath)}`);
    }
  }
}

try {
  await access(publicDir, constants.R_OK);
  await validateAssetDirectory(publicDir);
  console.log("Repository structure, required scripts, and public assets are valid.");
} catch (error) {
  if (error?.code === "ENOENT") {
    console.log("Repository structure and required scripts are valid. No public directory exists yet; public asset checks were skipped.");
  } else {
    throw error;
  }
}
