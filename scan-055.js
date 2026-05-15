const fs = require("fs");
const s = fs.readFileSync(__dirname + "/055~mtv7mw1vv.js.下载", "utf8");

const rpc = [...s.matchAll(/\.rpc\(\s*["'`]([^"'`]+)["'`]/g)].map((m) => m[1]);
const from = [...s.matchAll(/\.from\(\s*["'`]([^"'`]+)["'`]/g)].map((m) => m[1]);
const actions = [...s.matchAll(/\[[a-z-]+\]/g)]
  .map((m) => m[0])
  .filter((x) => x.includes("chat") || x.includes("prompt") || x.includes("character") || x.includes("tale"));

console.log("rpc:", [...new Set(rpc)].sort().join(", ") || "(none)");
console.log("from:", [...new Set(from)].sort().join(", ") || "(none)");
console.log("actions:", [...new Set(actions)].sort().join(", ") || "(none)");

const urls = [...s.matchAll(/https?:\/\/[a-zA-Z0-9._/-]+/g)].map((m) => m[0]);
const interesting = [...new Set(urls)].filter(
  (u) => /supabase|noxxx|edge|function|openai|anthropic/i.test(u)
);
console.log("\nurls:", interesting.join("\n") || "(none)");
