import { access, readFile } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";

const root = process.cwd();
const required = ["app", "docs", "public", "package.json", "tsconfig.json"];

for (const entry of required) {
  await access(path.join(root, entry), constants.R_OK);
}

const packageJson = JSON.parse(await readFile(path.join(root, "package.json"), "utf8"));
for (const script of ["build", "lint", "typecheck", "test", "validate"]) {
  if (!packageJson.scripts?.[script]) {
    throw new Error(`Missing required npm script: ${script}`);
  }
}

console.log("Repository structure and required scripts are valid.");
