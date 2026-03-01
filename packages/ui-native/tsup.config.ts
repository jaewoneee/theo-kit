import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  clean: true,
  external: ["react", "react-native", "nativewind", "theo-kit-core"],
  sourcemap: true,
  minify: false,
  splitting: false,
  treeshake: true,
});
