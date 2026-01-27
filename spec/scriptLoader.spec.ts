import { describe, it, expect, afterEach } from "vitest"
import scriptLoader from "../src/hooks/scriptLoader"

describe("scriptLoader", () => {
  const scriptSrc = "https://connect.nosto.com/include/shopify-11368366139"

  afterEach(() => {
    // Clean up any scripts we added
    document.querySelectorAll(`script[src="${scriptSrc}"]`).forEach(el => el.remove())
  })

  it("loads script", async () => {
    await scriptLoader(scriptSrc)

    const selector = `script[src="${scriptSrc}"]`
    const script = document.querySelector<HTMLScriptElement>(selector)
    expect(script).not.toBeNull()
    expect(script?.src).toBe(scriptSrc)
  })

  it("supports custom attributes", async () => {
    await scriptLoader(scriptSrc, { attributes: { "data-test": "test" } })

    const selector = `script[src="${scriptSrc}"]`
    const script = document.querySelector<HTMLScriptElement>(selector)
    expect(script).not.toBeNull()
    expect(script?.getAttribute("data-test")).toBe("test")
  })

  it("supports custom position", async () => {
    await scriptLoader(scriptSrc, { position: "head" })

    const selector = `script[src="${scriptSrc}"]`
    const script = document.head.querySelector<HTMLScriptElement>(selector)
    expect(script).not.toBeNull()
    expect(script?.src).toBe(scriptSrc)
  })
})
