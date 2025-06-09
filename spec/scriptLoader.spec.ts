import { describe, it, expect } from "vitest"
import scriptLoader from "../src/hooks/scriptLoader"

describe("scriptLoader", () => {
  const scriptSrc = "https://connect.nosto.com/include/shopify-11368366139"
  const selector = `script[src="${scriptSrc}"]`

  it("loads script", async () => {
    await scriptLoader(scriptSrc)

    const script = document.querySelector<HTMLScriptElement>(selector)
    expect(script).not.toBeNull()
    expect(script?.src).toBe(scriptSrc)
  })

  it("supports custom attributes", async () => {
    await scriptLoader(scriptSrc, { attributes: { "data-test": "test" } })

    const script = document.querySelector<HTMLScriptElement>(selector)
    expect(script).not.toBeNull()
    expect(script?.getAttribute("data-test")).toBe("test")
  })

  it("supports custom position", async () => {
    await scriptLoader(scriptSrc, { position: "head" })

    const script = document.head.querySelector<HTMLScriptElement>(selector)
    expect(script).not.toBeNull()
    expect(script?.src).toBe(scriptSrc)
  })
})
