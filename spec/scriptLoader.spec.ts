import { describe, it, expect } from "vitest"
import scriptLoader from "../src/hooks/scriptLoader"

describe("scriptLoader", () => {
  const scriptSrc = "http://connect.nosto.com/include/shopify-11368366139"

  it("loads script", async () => {
    await scriptLoader(scriptSrc)

    const script = document.querySelector("script")
    expect(script).not.toBeNull()
    expect(script?.src).toBe(scriptSrc)
  })

  it("supports custom attributes", async () => {
    await scriptLoader(scriptSrc, { attributes: { "data-test": "test" } })

    const script = document.querySelector("script")
    expect(script).not.toBeNull()
    expect(script?.getAttribute("data-test")).toBe("test")
  })

  it("supports custom position", async () => {
    await scriptLoader(scriptSrc, { position: "head" })

    const script = document.head.querySelector("script")
    expect(script).not.toBeNull()
    expect(script?.src).toBe(scriptSrc)
  })
})
