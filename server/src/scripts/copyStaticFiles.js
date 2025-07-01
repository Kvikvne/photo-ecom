const fs = require("fs");
const path = require("path");
/**
 * This is a script to make sure any static files such as json files are copied
 * over to dist at build time. Make sure you include it in the build command.
 */
const srcDir = path.resolve("src/scripts/data");
const destDir = path.resolve("dist/scripts/data");

fs.mkdirSync(destDir, { recursive: true });

fs.readdirSync(srcDir).forEach((file) => {
  const srcFile = path.join(srcDir, file);
  const destFile = path.join(destDir, file);
  fs.copyFileSync(srcFile, destFile);
});
