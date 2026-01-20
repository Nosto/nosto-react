import { describe, expect, it, vi } from "vitest"
import { renderHook, waitFor } from "@testing-library/react"
import { useLoadClientScript } from "../src/hooks/useLoadClientScript"
import scriptLoader from "../src/hooks/scriptLoader"
import "@testing-library/jest-dom/vitest"
import { nostojs, isNostoLoaded } from "@nosto/nosto-js"
import { mockNostojs } from "@nosto/nosto-js/testing"

function loadClientScript(merchant: string) {
  const script = document.createElement("script")
  script.setAttribute("nosto-client-script", "")
  script.src = `https://connect.nosto.com/include/${merchant}`
  script.type = "text/javascript"
  script.async = true
  const promise = new Promise<void>(resolve => {
    script.onload = () => resolve()
  })
  document.body.appendChild(script)
  return promise
}

function getScriptSources() {
  return Array.from(document.querySelectorAll("script")).map(script => script.src)
}

function wait(time: number) {
  return new Promise(resolve => setTimeout(resolve, time))
}

describe("useLoadClientScript", () => {
  const testAccount = "shopify-11368366139"

  it("loads client script", async () => {
    const hook = renderHook(() => useLoadClientScript({ account: testAccount }))
    
    // Wait for the script element to be added to the DOM
    await waitFor(() => {
      expect(getScriptSources()).toContain(`https://connect.nosto.com/include/${testAccount}`)
    }, { timeout: 1000 })
    
    // Script will fail to load in JSDOM, so clientScriptLoaded will remain false
    expect(hook.result.current.clientScriptLoaded).toBe(false)
  })

  it("sets auto load to false", async () => {
    const apiMock = {
      setAutoLoad: vi.fn()
    }
    mockNostojs(apiMock)
    const hook = renderHook(() => useLoadClientScript({ account: testAccount }))
    await new Promise(nostojs)

    hook.rerender()
    expect(apiMock.setAutoLoad).toHaveBeenCalled()
  })

  it("support custom script loaders", async () => {
    const customScriptLoader = vi.fn(scriptLoader)
    const hook = renderHook(() => useLoadClientScript({ account: testAccount, scriptLoader: customScriptLoader }))
    
    // Wait for the custom script loader to be called
    await waitFor(() => {
      expect(customScriptLoader).toHaveBeenLastCalledWith(`https://connect.nosto.com/include/${testAccount}`, {
        attributes: { "nosto-client-script": "" }
      })
    }, { timeout: 1000 })
  })

  // TODO: These tests fail in JSDOM because external scripts can't actually load
  // In a real browser environment, these would test that the hook detects
  // when the Nosto client script is loaded externally (outside of React)
  it.skip("set loaded state to true when client is loaded externally after", async () => {
    const hook = renderHook(() => useLoadClientScript({ loadScript: false, account: testAccount }))
    expect(hook.result.current.clientScriptLoaded).toBe(false)

    // Manually create script element
    const script = document.createElement("script")
    script.setAttribute("nosto-client-script", "")
    script.src = `https://connect.nosto.com/include/${testAccount}`
    script.type = "text/javascript"
    script.async = true
    document.body.appendChild(script)
    
    // Manually trigger the onload event using window.Event
    const loadEvent = new window.Event("load")
    script.dispatchEvent(loadEvent)
    
    // The nostojs callback should be called when the script loads
    await new Promise(resolve => nostojs(() => resolve(undefined)))

    hook.rerender()
    expect(hook.result.current.clientScriptLoaded).toBe(true)
    expect(getScriptSources()).toContain(`https://connect.nosto.com/include/${testAccount}`)
  })

  it.skip("set loaded state to true when client is loaded externally before", async () => {
    // Manually create script element before rendering the hook
    const script = document.createElement("script")
    script.setAttribute("nosto-client-script", "")
    script.src = `https://connect.nosto.com/include/${testAccount}`
    script.type = "text/javascript"
    script.async = true
    document.body.appendChild(script)
    
    // Manually trigger the onload event using window.Event
    const loadEvent = new window.Event("load")
    script.dispatchEvent(loadEvent)
    
    // The nostojs callback should be called when the script loads
    await new Promise(resolve => nostojs(() => resolve(undefined)))

    const { result } = renderHook(() => useLoadClientScript({ loadScript: false, account: testAccount }))
    expect(result.current.clientScriptLoaded).toBe(true)
    expect(getScriptSources()).toContain(`https://connect.nosto.com/include/${testAccount}`)
  })

  it("remove existing Shopify markets related scripts before loading new ones", () => {
    const props = { account: testAccount, shopifyMarkets: { marketId: "123", language: "en" } }
    const hook = renderHook(props => useLoadClientScript(props), { initialProps: props })
    expect(getScriptSources()).toContain(
      `https://connect.nosto.com/script/shopify/market/nosto.js?merchant=${testAccount}&market=123&locale=en`
    )

    const existingScript = document.querySelector("[nosto-client-script]")
    const nostoSandbox = document.querySelector("#nosto-sandbox")

    Object.assign(props.shopifyMarkets, { marketId: "234", language: "fr" })

    hook.rerender(props)
    expect(document.body.contains(existingScript)).toBe(false)
    expect(document.body.contains(nostoSandbox)).toBe(false)
    expect(getScriptSources()).toContain(
      `https://connect.nosto.com/script/shopify/market/nosto.js?merchant=${testAccount}&market=234&locale=fr`
    )
  })
})
