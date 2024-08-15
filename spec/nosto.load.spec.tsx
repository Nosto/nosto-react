import React from "react"
import { vi, describe, expect, it } from "vitest"
import { render } from "@testing-library/react"
import { NostoProvider, NostoHome } from "../src/index"

describe("Nosto client script loading", () => {
  it("verify Nosto is not loaded twice", () => {
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
})