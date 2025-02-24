import { test, expect } from "vitest"
import { render, renderHook, screen } from "@testing-library/react"
import { NostoProvider, NostoPlacement, NostoProduct, useNostoProduct, Recommendation } from "../src/index"
import RecommendationComponent from "./renderer"
import { waitForRecommendations } from "./utils"
import mockApi from "./mocks/mock-api"
import { mockNostojs } from "@nosto/nosto-js/testing"
import { ActionResponse } from "@nosto/nosto-js/client"
import { nostojs } from "@nosto/nosto-js"

test("Product page render", async () => {
  const placements = ["productpage-nosto-1", "productpage-nosto-2"]
  const mocked = mockApi(placements)
  mockNostojs(mocked)

  render(
    <NostoProvider account="dummy-account" recommendationComponent={<RecommendationComponent />} loadScript={false}>
      <NostoPlacement id="productpage-nosto-1" />
      <NostoPlacement id="productpage-nosto-2" />
      <NostoProduct product="dummy-product-id" />
    </NostoProvider>
  )

  await waitForRecommendations(2)

  expect(screen.getAllByTestId("recommendation-product").length).toBe(4)

  const productNames = screen.getAllByTestId("recommendation-product-name").map(el => el.textContent?.trim())
  expect(productNames).toEqual(["Product 1-1", "Product 1-2", "Product 2-1", "Product 2-2"])

  expect(mocked.getData()).toEqual({
    elements: placements,
    responseMode: "JSON_ORIGINAL",
    variation: "",
    pageType: "product",
    products: [{ product_id: "dummy-product-id" }]
  })
})

test("useNostoProduct validation", async () => {
  const product = "7078777258043"
  const tagging = {} as { product_id: string }

  expect(() => renderHook(() => useNostoProduct({ product, tagging }))).toThrowError(
    "The product object must contain a product_id property"
  )
})

test("Product Page with ref", async () => {
  const placements = ["productpage-nosto-1", "productpage-nosto-2"]
  const mocked = mockApi(placements)
  mockNostojs(mocked)

  render(
    <NostoProvider account="dummy-account" recommendationComponent={<RecommendationComponent />} loadScript={false}>
      <NostoPlacement id="productpage-nosto-1" />
      <NostoPlacement id="productpage-nosto-2" />
      <NostoProduct product="dummy-product-id" reference="dummy-ref" />
    </NostoProvider>
  )

  await waitForRecommendations(2)

  expect(mocked.getData()).toEqual({
    elements: placements,
    responseMode: "JSON_ORIGINAL",
    variation: "",
    pageType: "product",
    ref: {
      "dummy-product-id": "dummy-ref"
    },
    products: [{ product_id: "dummy-product-id" }]
  })
})

test("throws when renderMode property used with hook", async () => {
  const placements = ["productpage-nosto-1", "productpage-nosto-2"]
  const mocked = mockApi(placements)
  mockNostojs(mocked)

  expect(() =>
    render(
      <NostoProvider account="dummy-account" renderMode="JSON_ORIGINAL" loadScript={false}>
        <NostoPlacement id="productpage-nosto-1" />
        <NostoPlacement id="productpage-nosto-2" />
        <NostoProduct product="dummy-product-id" reference="dummy-ref" />
      </NostoProvider>
    )
  ).toThrowError("recommendationComponent is required for client-side rendering using hook")
})

test("Product Page with renderMode property", async () => {
  const placements = ["productpage-nosto-1", "productpage-nosto-2"]
  const mocked = mockApi(placements)
  mockNostojs(mocked)

  const result = await new Promise<ActionResponse>(resolve =>
    nostojs(async api => {
      const data = await api
        .defaultSession()
        .viewProduct("dummy-product-id")
        .setRef("dummy-product-id", "dummy-ref")
        .setPlacements(placements)
        .load()
      resolve(data)
    })
  )

  const productPageNosto1 = result.campaigns?.recommendations["productpage-nosto-1"] as Recommendation
  const productPageNosto2 = result.campaigns?.recommendations["productpage-nosto-2"] as Recommendation

  render(
    <NostoProvider account="dummy-account" renderMode="JSON_ORIGINAL" loadScript={false}>
      <NostoPlacement id="productpage-nosto-1">
        <RecommendationComponent nostoRecommendation={productPageNosto1} />
      </NostoPlacement>
      <NostoPlacement id="productpage-nosto-2">
        <RecommendationComponent nostoRecommendation={productPageNosto2} />
      </NostoPlacement>
    </NostoProvider>
  )

  await waitForRecommendations(2)

  expect(mocked.getData()).toEqual({
    elements: placements,
    pageType: "product",
    ref: {
      "dummy-product-id": "dummy-ref"
    },
    products: [{ product_id: "dummy-product-id" }]
  })
})
