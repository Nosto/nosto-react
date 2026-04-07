import { test, expect } from "vitest"
import fs from "fs"

test("es build has external react dependencies", () => {
  const content = fs.readFileSync("dist/index.es.js", "utf-8")
  const imports = ["react", "react/jsx-runtime", "react-dom"]
  imports.forEach(imp => {
    expect(content).toContain(`from "${imp}"`)
  })
})