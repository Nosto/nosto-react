import React from "react"
import { render } from "@testing-library/react"
import { NostoProvider, NostoHome } from "../src/index"
import "@testing-library/jest-dom"

test("verify Nosto is not loaded twice", async () => {
  // @ts-expect-error dummy placeholder for Nosto iframe window scope  
  window.nosto = {}

  render(
    <NostoProvider account="shopify-11368366139">
      <NostoHome />
    </NostoProvider>
  )

  expect(document.querySelector("[nosto-client-script]")).not.toBeInTheDocument()  
})

test("verify Shopify markets script is loaded", async () => {
  render(
    <NostoProvider account="shopify-11368366139" shopifyMarkets={{ language: "en", marketId: "123" }}>
      <NostoHome />
    </NostoProvider>
  )

  expect(document.querySelector("[nosto-client-script]")).toBeInTheDocument()
  expect(document.querySelector("[nosto-client-script]")?.getAttribute("nosto-language")).toBe("en")
  expect(document.querySelector("[nosto-client-script]")?.getAttribute("nosto-market-id")).toBe("123")
})

test("verify Nosto client script is loaded", async () => {
  render(
    <NostoProvider account="shopify-11368366139">
      <NostoHome />
    </NostoProvider>
  )

  expect(document.querySelector("[nosto-client-script]")).toBeInTheDocument()
})
