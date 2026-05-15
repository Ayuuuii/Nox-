const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname);
const keys = [
  "提示词",
  "内置",
  "systemPrompt",
  "system_prompt",
  "builtinPrompt",
  "persona",
  "worldbook",
  "char_prompt",
  "scenario",
  "preset",
  "DEFAULT_",
  "You are",
  "你是",
];

function scanFile(filePath) {
  const s = fs.readFileSync(filePath, "utf8");
  const hits = [];
  for (const k of keys) {
    let i = 0;
    while ((i = s.indexOf(k, i)) >= 0) {
      hits.push({ key: k, index: i, ctx: s.slice(Math.max(0, i - 80), i + 200) });
      i += k.length;
      if (hits.length > 200) break;
    }
  }
  const cn = [...s.matchAll(/[\u4e00-\u9fff]{4,}/g)].map((m) => m[0]);
  return { hits, cn: [...new Set(cn)] };
}

for (const name of fs.readdirSync(dir)) {
  if (!/\.(js|css|html|json)$/i.test(name) && !name.includes(".js.")) continue;
  const fp = path.join(dir, name);
  if (fs.statSync(fp).isDirectory()) continue;
  const { hits, cn } = scanFile(fp);
  if (hits.length || cn.length > 10) {
    console.log("\n===", name, "hits:", hits.length, "cn:", cn.length);
    hits.slice(0, 8).forEach((h) => console.log(`  [${h.key}]`, h.ctx.replace(/\n/g, " ").slice(0, 200)));
    if (cn.length) console.log("  CN sample:", cn.slice(0, 25).join(" | "));
  }
}
