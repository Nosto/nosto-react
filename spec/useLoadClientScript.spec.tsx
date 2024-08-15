import { describe, expect, it } from "vitest"
import { renderHook } from "@testing-library/react"
import { useLoadClientScript } from "../src/hooks"
import "@testing-library/jest-dom/vitest"

function loadClientScript(merchant: string) {
  const script = document.createElement("script")
  script.setAttribute("nosto-client-script", "")
  script.src = `https://connect.nosto.com/include/${merchant}`
  script.type = "text/javascript"
  script.async = true
  const promise = new Promise<void>(resolve => {
    script.onload = () => {
      window.nosto?.reload({ site: "localhost" })
      resolve()
    }
  })
  document.body.appendChild(script)
  return promise
}

describe("useLoadClientScript", () => {

  it("loads client script", async () => {
    const hook = renderHook(() => useLoadClientScript({ account: "shopify-11368366139" }))
    await new Promise(window.nostojs)

    hook.rerender()
    expect(hook.result.current.clientScriptLoaded).toBe(true)
    expect(window.nosto).toBeDefined()
  })

  it("set loaded state to true when client is loaded externally after", async () => {
    const hook = renderHook(() => useLoadClientScript({ loadScript: false, account: "shopify-11368366139" }))
    expect(hook.result.current.clientScriptLoaded).toBe(false)

    await loadClientScript("shopify-11368366139")
    expect(window.nosto).toBeDefined()

    hook.rerender()
    expect(hook.result.current.clientScriptLoaded).toBe(true)
  })

  it("set loaded state to true when client is loaded externally before", async () => {
    await loadClientScript("shopify-11368366139")
    expect(window.nosto).toBeDefined()

    const hook = renderHook(() => useLoadClientScript({ loadScript: false, account: "shopify-11368366139" }))
    expect(hook.result.current.clientScriptLoaded).toBe(true)
  })

  it("remove existing Shopify markets related scripts before loading new ones", () => {
    const existingScript = document.createElement("script")
    existingScript.setAttribute("nosto-client-script", "")
    document.body.appendChild(existingScript)

    const nostoSandbox = document.createElement("div")
    nostoSandbox.id = "nosto-sandbox"
    document.body.appendChild(nostoSandbox)

    renderHook(() => useLoadClientScript({ account: "shopify-11368366139", shopifyMarkets: { marketId: "123", language: "en" } }))

    expect(document.body.contains(existingScript)).toBe(false)
    expect(document.body.contains(nostoSandbox)).toBe(false)
  })
})