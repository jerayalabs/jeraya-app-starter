import { build } from "tsup";
import fg from "fast-glob";
import path from "node:path";

const files = await fg("src/functions/**/*.ts");

const entry = Object.fromEntries(
  files.map(file => [
    path.relative("src/functions", file).replace(/\.ts$/, ""),
    file,
  ])
);

await build({
  entry,
  outDir: "dist/functions",
  bundle: true,
  format: ["cjs"],
  splitting: true,
  clean: true,
  noExternal: [/(.*)/],
  // Add this to force the extension to be .js instead of .cjs
  outExtension({ format }) {
    return {
      js: ".js",
    };
  },
});
