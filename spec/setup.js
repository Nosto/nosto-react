import { JSDOM } from "jsdom"
import { afterEach } from "vitest"
import { clearNostoGlobals } from "@nosto/nosto-js/testing"

const { window } = new JSDOM("<html></html>", {
  url: "http://localhost",
  resources: "usable",
  runScripts: "dangerously"
})
global.window = window
global.location = window.location
global.document = window.document
global.localStorage = window.localStorage
global.navigator = window.navigator

// test mode flag
global.window.nostoReactTest = true

afterEach(() => {
  clearNostoGlobals()
  document.head.innerHTML = ""
  document.body.innerHTML = ""
})
