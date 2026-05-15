const fs = require("fs");
const path = require("path");

const files = fs.readdirSync(__dirname).filter(
  (f) => f.endsWith(".js") || f.includes(".js.")
);

const patterns = [
  /\.from\(["'`]([^"'`]+)["'`]/g,
  /\.rpc\(["'`]([^"'`]+)["'`]/g,
  /\/api\/[a-zA-Z0-9_/-]+/g,
  /["'`][a-z_]*prompt[a-z_]*["'`]/gi,
  /["'`][a-z_]*persona[a-z_]*["'`]/gi,
  /["'`][a-z_]*character[a-z_]*["'`]/gi,
  /edge\/[a-zA-Z0-9_-]+/g,
];

for (const name of files) {
  const s = fs.readFileSync(path.join(__dirname, name), "utf8");
  const found = new Set();
  for (const re of patterns) {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(s))) {
      found.add(m[0]);
      if (found.size > 100) break;
    }
  }
  if (found.size) {
    console.log("\n===", name, found.size);
    [...found].sort().slice(0, 40).forEach((x) => console.log(" ", x));
  }
}
