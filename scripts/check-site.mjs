import { access, readFile } from "node:fs/promises";
import { constants } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));

const requiredFiles = [
  "index.html",
  "articles/index.html",
  "articles/post.html",
  "scenarios/index.html",
  "scenarios/post.html",
  "materials/index.html",
  "contacts/index.html",
  "src/css/styles.css",
  "src/js/components.js",
  "src/js/content.js",
  "src/js/main.js",
  "public/favicon.svg",
  "vercel.json"
];

const requiredAssets = [
  "public/assets/images/image 304.png",
  "public/assets/images/image 312.png",
  "public/assets/images/image 314.png",
  "public/assets/images/Rectangle 546.png",
  "public/assets/images/a04ae635-5b30-493f-9b73-b176401be58d 2.png",
  "public/assets/images/a04ae635-5b30-493f-9b73-b176401be58d 21.png"
];

const assertExists = async (relativePath) => {
  await access(join(root, relativePath), constants.R_OK);
};

await Promise.all([...requiredFiles, ...requiredAssets].map(assertExists));

const styles = await readFile(join(root, "src/css/styles.css"), "utf8");
const vercel = await readFile(join(root, "vercel.json"), "utf8");

if (!styles.includes("grid-template-columns: repeat(12")) {
  throw new Error("12-column grid is missing from styles.css");
}

if (!styles.includes(".reveal") || !styles.includes(":hover")) {
  throw new Error("Base hover states or reveal animation styles are missing");
}

if (!vercel.includes("/articles/:slug") || !vercel.includes("/scenarios/:slug")) {
  throw new Error("Vercel rewrites for slug pages are missing");
}

console.log("Site check passed: required pages, assets, grid, animation and Vercel rewrites are in place.");
