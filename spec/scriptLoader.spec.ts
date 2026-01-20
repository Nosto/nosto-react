import { describe, it, expect } from "vitest"
import scriptLoader from "../src/hooks/scriptLoader"

describe("scriptLoader", () => {
  const scriptSrc = "https://connect.nosto.com/include/shopify-11368366139"
  const selector = `script[src="${scriptSrc}"]`

  it("loads script", async () => {
    await expect(scriptLoader(scriptSrc)).rejects.toThrow(`Could not load script: "${scriptSrc}"`)

    const script = document.querySelector<HTMLScriptElement>(selector)
    expect(script).not.toBeNull()
    expect(script?.src).toBe(scriptSrc)
  })

  it("supports custom attributes", async () => {
    await expect(scriptLoader(scriptSrc, { attributes: { "data-test": "test" } })).rejects.toThrow(`Could not load script: "${scriptSrc}"`)

    const script = document.querySelector<HTMLScriptElement>(selector)
    expect(script).not.toBeNull()
    expect(script?.getAttribute("data-test")).toBe("test")
  })

  it("supports custom position", async () => {
    await expect(scriptLoader(scriptSrc, { position: "head" })).rejects.toThrow(`Could not load script: "${scriptSrc}"`)

    const script = document.head.querySelector<HTMLScriptElement>(selector)
    expect(script).not.toBeNull()
    expect(script?.src).toBe(scriptSrc)
  })
})
