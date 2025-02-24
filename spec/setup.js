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
global.window.fetch = vi.fn().mockRejectedValue()

global.location = window.location
global.document = window.document
global.localStorage = window.localStorage

beforeEach(() => {
  window.nostoab = {
    settings: {
      site: "localhost"
    }
  }
})

afterEach(() => {
  clearNostoGlobals()
  document.head.innerHTML = ""
  document.body.innerHTML = ""
})
