import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.client.js"),
      name: "@nosto/nosto-react",
      formats: ["es", "umd"],
      fileName: (format) => `index.${format}.client.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "snakize"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
