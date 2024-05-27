import react from "@vitejs/plugin-react"
import path from "node:path"
import { defineConfig } from "vite"
import dts from "vite-plugin-dts"

export default defineConfig({
  plugins: [react(), dts({ rollupTypes: true, exclude: ["spec/*"] })],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "@nosto/nosto-react",
      formats: ["es", "umd"],
      fileName: format => `index.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "snakize", "react-dom/client"],
      output: {
        globals: {
          react: "React",
          "react-dom/client": "ReactDOM",
        },
      },
    },
  },
})
