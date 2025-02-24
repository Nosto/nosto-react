import { describe, expect, it } from "vitest"
import { render } from "@testing-library/react"
import "@testing-library/jest-dom/vitest"
import { NostoProvider, NostoHome, Recommendation } from "../src/index"
import RecommendationComponent from "./renderer"

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

  it("throws error on invalid recommendationComponent", () => {
    type InvalidComponent = React.ReactElement<{ nostoRecommendation: Recommendation }>
    expect(() => {
      render(
        <NostoProvider account="shopify-11368366139" recommendationComponent={true as unknown as InvalidComponent}>
          <NostoHome />
        </NostoProvider>
      )
    }).toThrowError()
  })

  it("access valid React elements in recommendationComponent", () => {
    render(
      <NostoProvider account="shopify-11368366139" recommendationComponent={<RecommendationComponent />}>
        <NostoHome />
      </NostoProvider>
    )

    expect(document.querySelector("[nosto-client-script]")).toBeInTheDocument()
  })

  it("throws when renderMode prop is supplied with hook", () => {
    expect(() =>
      render(
        <NostoProvider account="shopify-11368366139" renderMode="JSON_ORIGINAL">
          <NostoHome />
        </NostoProvider>
      )
    ).toThrowError("recommendationComponent is required for client-side rendering using hook")
  })

  it("validate script loader with renderMode prop", () => {
    render(
      <NostoProvider account="shopify-11368366139" renderMode="JSON_ORIGINAL">
        <span>Recommendations</span>
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
