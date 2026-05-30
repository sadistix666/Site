import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const port = Number(process.env.PORT || 4173);

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp"
};

const getFilePath = async (requestPath) => {
  const decodedPath = decodeURIComponent(requestPath);
  const cleanPath = decodedPath.replace(/^\/+/, "");
  const normalized = normalize(cleanPath);
  const routePath = normalized.replaceAll("\\", "/");

  if (routePath.startsWith("..")) {
    return null;
  }

  if (/^articles\/[^/]+$/.test(routePath) && routePath !== "articles/index.html") {
    return join(root, "articles/post.html");
  }

  if (/^scenarios\/[^/]+$/.test(routePath) && routePath !== "scenarios/index.html") {
    return join(root, "scenarios/post.html");
  }

  const candidate = join(root, normalized || "index.html");

  try {
    const fileStat = await stat(candidate);
    if (fileStat.isDirectory()) {
      return join(candidate, "index.html");
    }
    return candidate;
  } catch {
    if (!extname(candidate)) {
      return join(candidate, "index.html");
    }
    return candidate;
  }
};

createServer(async (req, res) => {
  const url = new URL(req.url || "/", `http://${req.headers.host}`);
  const filePath = await getFilePath(url.pathname);

  if (!filePath) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  try {
    const content = await readFile(filePath);
    const type = mimeTypes[extname(filePath)] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": type });
    res.end(content);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Not found");
  }
}).listen(port, () => {
  console.log(`Local server: http://localhost:${port}`);
});
