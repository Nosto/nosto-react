import { describe, expect, it, vi } from "vitest"
import { render, renderHook } from "@testing-library/react"
import "@testing-library/jest-dom/vitest"
import { NostoProvider, NostoHome } from "../src/index"
import { useLoadClientScript } from "../src/hooks"

describe("Nosto client script", () => {
  it("verify is not loaded twice", () => {
    // @ts-expect-error dummy placeholder for Nosto iframe window scope  
    window.nosto = {}

    render(
      <NostoProvider account="shopify-11368366139">
        <NostoHome />
      </NostoProvider>
    )

    expect(document.querySelector("[nosto-client-script]")).not.toBeInTheDocument()
  })

  it("is loaded", () => {
    render(
      <NostoProvider account="shopify-11368366139">
        <NostoHome />
      </NostoProvider>
    )

    expect(document.querySelector("[nosto-client-script]")).toBeInTheDocument()
  })

  it("Shopify markets script", () => {
    render(
      <NostoProvider account="shopify-11368366139" shopifyMarkets={{ language: "en", marketId: "123" }}>
        <NostoHome />
      </NostoProvider>
    )

    expect(document.querySelector("[nosto-client-script]")).toBeInTheDocument()
    expect(document.querySelector("[nosto-client-script]")?.getAttribute("nosto-language")).toBe("en")
    expect(document.querySelector("[nosto-client-script]")?.getAttribute("nosto-market-id")).toBe("123")
  })

  it("should set loaded state to true when client is loaded", () => {
    const hook = renderHook(() => useLoadClientScript({ loadScript: false, account: "shopify-11368366139" }))
    expect(hook.result.current.clientScriptLoaded).toBe(true)
  })

  it("remove existing scripts before loading new ones", () => {
    const existingScript = document.createElement("script")
    existingScript.setAttribute("nosto-client-script", "")
    document.body.appendChild(existingScript)

    const nostoSandbox = document.createElement("div")
    nostoSandbox.id = "nosto-sandbox"
    document.body.appendChild(nostoSandbox)

    renderHook(() => useLoadClientScript({ loadScript: true, account: "shopify-11368366139", shopifyMarkets: { marketId: "123", language: "en" } }))

    expect(document.body.contains(existingScript)).toBe(false)
    expect(document.body.contains(nostoSandbox)).toBe(false)
  })
})