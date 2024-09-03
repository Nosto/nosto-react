import { test, expect } from "vitest"
import { render, renderHook, screen } from "@testing-library/react"
import { NostoProvider, NostoPlacement, NostoProduct, useNostoProduct } from "../src/index"
import RecommendationComponent from "./renderer"
import { waitForRecommendations } from "./utils"

test("Product page render", async () => {
  render(
    <NostoProvider account="shopify-11368366139" recommendationComponent={<RecommendationComponent />}>
      <NostoPlacement id="productpage-nosto-1" />
      <NostoPlacement id="productpage-nosto-2" />
      <NostoPlacement id="productpage-nosto-3" />
      <NostoProduct product="7078777258043" />
    </NostoProvider>
  )

  await waitForRecommendations(3)

  expect(screen.getAllByTestId("recommendation-product").length).toBeGreaterThanOrEqual(3)

  screen.getAllByTestId("recommendation-product-name").forEach(el => {
    expect(el.textContent?.trim().length).toBeGreaterThan(5)
  })
})


test("useNostoProduct validation", async () => {

  const product = "7078777258043"
  const tagging = {} as { product_id: string }

  expect(() => renderHook(() => useNostoProduct({ product, tagging })))
    .toThrowError("The product object must contain a product_id property")
})
