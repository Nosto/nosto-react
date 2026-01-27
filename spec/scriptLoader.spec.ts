import { describe, it, expect, beforeEach, afterEach, vi } from "vitest"
import scriptLoader from "../src/hooks/scriptLoader"

describe("scriptLoader", () => {
  const scriptSrc = "https://connect.nosto.com/include/shopify-11368366139"
  
  let originalAppendChild: typeof window.Node.prototype.appendChild

  beforeEach(() => {
    // Clean up any existing scripts first
    document.querySelectorAll(`script[src="${scriptSrc}"]`).forEach(el => el.remove())
    
    // Mock appendChild to trigger onload and suppress onerror
    originalAppendChild = window.Node.prototype.appendChild
    window.Node.prototype.appendChild = function<T extends Node>(node: T): T {
      const result = originalAppendChild.call(this, node)
      if (node instanceof window.HTMLScriptElement && (node as HTMLScriptElement).src) {
        const scriptNode = node as HTMLScriptElement
        // Suppress onerror to prevent test failures from network errors
        scriptNode.onerror = null
        // Trigger onload immediately to simulate successful load
        setTimeout(() => {
          if (scriptNode.onload) {
            scriptNode.onload(new Event('load'))
          }
        }, 0)
      }
      return result
    }
  })

  afterEach(() => {
    window.Node.prototype.appendChild = originalAppendChild
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
