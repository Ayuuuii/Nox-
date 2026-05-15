const fs = require("fs");
const path = require("path");

const dir = __dirname;
const apis = new Set();

for (const f of fs.readdirSync(dir)) {
  if (!f.includes("js")) continue;
  const s = fs.readFileSync(path.join(dir, f), "utf8");
  const re = /\/api\/[a-zA-Z0-9_/-]+/g;
  let m;
  while ((m = re.exec(s))) apis.add(m[0]);
}

console.log([...apis].sort().join("\n") || "(none in local files)");

const routes = [
  "/api/chat",
  "/api/prompts",
  "/api/prompt",
  "/api/settings",
  "/api/builtin-prompts",
  "/api/builtin",
  "/api/character",
  "/api/characters",
  "/api/worlds",
  "/api/tale",
  "/api/voice",
];

(async () => {
  for (const r of routes) {
    try {
      const get = await fetch("https://noxxx.app" + r);
      const txt = await get.text();
      console.log("\nGET", r, get.status, txt.slice(0, 200));
    } catch (e) {
      console.log("GET", r, "err", e.message);
    }
  }
})();
