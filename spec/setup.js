import { JSDOM } from "jsdom"
import { beforeEach, afterEach, vi } from "vitest"
import { clearNostoGlobals } from "@nosto/nosto-js/testing"

const { window } = new JSDOM("<html></html>", {
  url: "http://localhost",
  resources: "usable",
  runScripts: "dangerously"
})
global.window = window
global.window.requestAnimationFrame = vi.fn()
global.window.CSS = { escape: v => v }
global.window.fetch = (url, { signal, ...options } = {}) => {
  // exclude AbortSignal due to limited support in node-fetch
  return fetch(url, options)
}

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

beforeEach(() => {
  window.nostoab = {
    settings: {
      site: "http://localhost"
    }
  }
})

afterEach(() => {
  clearNostoGlobals()
  document.head.innerHTML = ""
  document.body.innerHTML = ""
})
