import { describe, expect, it, vi } from "vitest"
import { renderHook } from "@testing-library/react"
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
    await new Promise(nostojs)

    hook.rerender()
    await wait(1)
    expect(hook.result.current.clientScriptLoaded).toBe(true)
    expect(isNostoLoaded()).toBeTruthy()
    expect(getScriptSources()).toEqual([`https://connect.nosto.com/include/${testAccount}`])
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
    await new Promise(nostojs)

    hook.rerender()
    expect(customScriptLoader).toHaveBeenLastCalledWith(`https://connect.nosto.com/include/${testAccount}`, {
      attributes: { "nosto-client-script": "" }
    })
  })

  it("set loaded state to true when client is  loaded externally after", async () => {
    const hook = renderHook(() => useLoadClientScript({ loadScript: false, account: testAccount }))
    expect(hook.result.current.clientScriptLoaded).toBe(false)

    await loadClientScript(testAccount)
    expect(isNostoLoaded()).toBeTruthy()

    hook.rerender()
    expect(hook.result.current.clientScriptLoaded).toBe(true)
    expect(getScriptSources()).toEqual([`https://connect.nosto.com/include/${testAccount}`])
  })

  it("set loaded state to true when client is loaded externally before", async () => {
    await loadClientScript(testAccount)
    expect(isNostoLoaded()).toBeTruthy()

    const { result } = renderHook(() => useLoadClientScript({ loadScript: false, account: testAccount }))
    expect(result.current.clientScriptLoaded).toBe(true)
    expect(getScriptSources()).toEqual([`https://connect.nosto.com/include/${testAccount}`])
  })

  it("remove existing Shopify markets related scripts before loading new ones", () => {
    const props = { account: testAccount, shopifyMarkets: { marketId: "123", language: "en" } }
    const hook = renderHook(props => useLoadClientScript(props), { initialProps: props })
    expect(getScriptSources()).toEqual([
      `https://connect.nosto.com/script/shopify/market/nosto.js?merchant=${testAccount}&market=123&locale=en`
    ])

    const existingScript = document.querySelector("[nosto-client-script]")
    const nostoSandbox = document.querySelector("#nosto-sandbox")

    Object.assign(props.shopifyMarkets, { marketId: "234", language: "fr" })

    hook.rerender(props)
    expect(document.body.contains(existingScript)).toBe(false)
    expect(document.body.contains(nostoSandbox)).toBe(false)
    expect(getScriptSources()).toEqual([
      `https://connect.nosto.com/script/shopify/market/nosto.js?merchant=${testAccount}&market=234&locale=fr`
    ])
  })
})
