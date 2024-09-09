import { test, expect } from "vitest"
import { render, renderHook, screen } from "@testing-library/react"
import { NostoProvider, NostoPlacement, NostoProduct, useNostoProduct } from "../src/index"
import RecommendationComponent from "./renderer"
import { waitForRecommendations } from "./utils"
import mockApi from "./mocks/mock-api"

test("Product page render", async () => {
  const placements = ["productpage-nosto-1", "productpage-nosto-2"]
  const mocked = mockApi(placements)
  window.nostojs = cb => cb(mocked)

  render(
    <NostoProvider account="dummy-account" recommendationComponent={<RecommendationComponent />} loadScript={false}>
      <NostoPlacement id="productpage-nosto-1" />
      <NostoPlacement id="productpage-nosto-2" />
      <NostoProduct product="dummy-product-id" />
    </NostoProvider>
  )

  await waitForRecommendations(2)

  expect(screen.getAllByTestId("recommendation-product").length).toBe(4)

  const productIds = screen.getAllByTestId("recommendation-product-name").map(el => el.textContent?.trim())

  expect(productIds).toEqual(["Product 1-1", "Product 1-2", "Product 2-1", "Product 2-2"])

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
