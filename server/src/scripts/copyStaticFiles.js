const fs = require("fs");
const path = require("path");

const srcDir = path.resolve("src/scripts/data");
const destDir = path.resolve("dist/scripts/data");

fs.mkdirSync(destDir, { recursive: true });

fs.readdirSync(srcDir).forEach((file) => {
  const srcFile = path.join(srcDir, file);
  const destFile = path.join(destDir, file);
  fs.copyFileSync(srcFile, destFile);
});
