import { JSDOM } from "jsdom"
import { beforeEach, afterEach, vi } from "vitest"
import { clearNostoGlobals, mockNostojs, restoreNostojs } from "@nosto/nosto-js/testing"
import { initNostoStub } from "@nosto/nosto-js"

const { window } = new JSDOM("<html></html>", {
  url: "http://localhost",
  resources: "usable",
  runScripts: "dangerously"
})
global.window = window
global.window.requestAnimationFrame = vi.fn()
global.window.CSS = { escape: v => v }
global.window.fetch = global.fetch

global.location = window.location
global.document = window.document
global.localStorage = window.localStorage

// Polyfill performance.mark and performance.now until jsdom supports them
// Need for loading external client script because of performance API usage
Object.defineProperty(global.window, "performance", {
  value: {
    ...global.window.performance,
    measure: vi.fn(),
    mark: vi.fn(),
    now: vi.fn().mockReturnValue(Date.now())
  },
  writable: true,
  configurable: true
})

// Initialize Nosto stub to make nostojs available immediately
initNostoStub()

// Mock script loading to prevent network errors in test environment
const originalAppendChild = window.Node.prototype.appendChild
window.Node.prototype.appendChild = function(node) {
  const result = originalAppendChild.call(this, node)
  if (node instanceof window.HTMLScriptElement && node.src) {
    const scriptNode = node
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

beforeEach(() => {
  window.nostoab = {
    settings: {
      site: "http://localhost"
    }
  }
})

afterEach(() => {
  restoreNostojs()
  clearNostoGlobals()
  document.head.innerHTML = ""
  document.body.innerHTML = ""
})
