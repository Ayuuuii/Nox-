const fs = require("fs");
const s = fs.readFileSync(__dirname + "/055~mtv7mw1vv.js.下载", "utf8");

// backtick template strings
const templates = [...s.matchAll(/`([^`]{40,2000})`/g)].map((m) => m[1]);
const interesting = templates.filter(
  (t) =>
    /[\u4e00-\u9fff]/.test(t) ||
    /prompt|system|role|persona|你是|扮演|角色/i.test(t)
);
console.log("templates total", templates.length, "interesting", interesting.length);
interesting.slice(0, 20).forEach((t, i) => console.log(`\n[T${i + 1}]\n`, t.slice(0, 600)));

// localStorage / storage keys
const keys = [...s.matchAll(/localStorage\.(getItem|setItem)\(\s*["'`]([^"'`]+)["'`]/g)].map((m) => m[2]);
console.log("\nlocalStorage keys:", [...new Set(keys)].sort().join(", "));

// search prompt-ish keys in object literals
for (const kw of ["prompt", "system", "persona", "builtin", "preset", "instruction", "scenario"]) {
  const re = new RegExp(kw + "[A-Za-z_]{0,30}", "gi");
  const hits = [...new Set([...s.matchAll(re)].map((m) => m[0]))].slice(0, 20);
  if (hits.length) console.log("\n" + kw + " identifiers:", hits.join(", "));
}
