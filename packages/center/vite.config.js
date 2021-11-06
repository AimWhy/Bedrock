/* eslint-disable @typescript-eslint/no-var-requires */
// vite.config.js
const path = require("path");
const { defineConfig } = require("vite");

module.exports = defineConfig({
  build: {
    outDir: "./lib",
    lib: {
      entry: path.resolve(__dirname, "src/index.tsx"),
      name: "center",
      formats: ["cjs", "umd", "es"],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: [
        "react",
        "styled-components",
        "@bedrock-layout/spacing-constants",
      ],
    },
  },
});