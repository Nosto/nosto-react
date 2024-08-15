import { describe, expect, it } from "vitest"
import { renderHook } from "@testing-library/react"
import { useLoadClientScript } from "../src/hooks"

describe("useLoadClientScript", () => {
  it("set loaded state to true when client is loaded externally", () => {
    const { result } = renderHook(() => useLoadClientScript({ loadScript: false, account: "shopify-11368366139" }))
    expect(result.current.clientScriptLoaded).toBe(true)
  })

  it("remove existing Shopify markets related scripts before loading new ones", () => {
    const existingScript = document.createElement("script")
    existingScript.setAttribute("nosto-client-script", "")
    document.body.appendChild(existingScript)

    const nostoSandbox = document.createElement("div")
    nostoSandbox.id = "nosto-sandbox"
    document.body.appendChild(nostoSandbox)

    const { result } = renderHook(() => useLoadClientScript({ account: "shopify-11368366139", shopifyMarkets: { marketId: "123", language: "en" } }))

    expect(document.body.contains(existingScript)).toBe(false)
    expect(document.body.contains(nostoSandbox)).toBe(false)
  })
})