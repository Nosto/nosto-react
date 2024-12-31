import react from "@vitejs/plugin-react"
import path from "node:path"
import { defineConfig } from "vite"
import dts from "vite-plugin-dts"
import { visualizer } from "rollup-plugin-visualizer"

export default defineConfig({
  plugins: [
    react(),
    visualizer(),
    dts({
      rollupTypes: true,
      exclude: ["spec/*"]
    })
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "@nosto/nosto-react",
      formats: ["es", "umd"],
      fileName: format => `index.${format}.js`
    },
    rollupOptions: {
      external: ["react", "react-dom", "react-dom/client", "react/jsx-runtime", "react-router-dom"],
      output: {
        globals: {
          react: "React",
          "react/jsx-runtime": "react/jsx-runtime",
          "react-dom": "ReactDOM",
          "react-router-dom": "react-router-dom"
        }
      }
    }
  },
  test: {
    include: ["*.spec.*"],
    dir: "spec",
    setupFiles: ["./spec/setup.js"]
  }
})
