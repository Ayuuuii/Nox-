const fs = require("fs");
const s = fs.readFileSync(__dirname + "/055~mtv7mw1vv.js.下载", "utf8");

const tags = ["api-chat", "characterstatus", "parsed-tale", "builtin", "systemPrompt", "system_prompt", "提示词", "内置"];
for (const t of tags) {
  let i = 0;
  let c = 0;
  while ((i = s.indexOf(t, i)) >= 0 && c < 6) {
    console.log("\n---", t, "at", i);
    console.log(s.slice(Math.max(0, i - 100), i + 350).replace(/\n/g, " "));
    i += t.length;
    c++;
  }
}

const strings = new Set();
for (const m of s.matchAll(/"([^"\\]{60,800})"/g)) {
  const t = m[1];
  if (/[\u4e00-\u9fff]/.test(t) || /you are|act as|roleplay|assistant|system/i.test(t)) {
    strings.add(t);
  }
}
console.log("\n=== interesting strings:", strings.size);
[...strings].slice(0, 30).forEach((t, i) => {
  console.log(`\n[${i + 1}]`, t.slice(0, 500));
});
