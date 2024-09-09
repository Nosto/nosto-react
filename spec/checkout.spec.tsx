import { test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { NostoProvider, NostoCheckout, NostoPlacement } from "../src/index"
import RecommendationComponent from "./renderer"
import { waitForRecommendations } from "./utils"
import mockApi from "./mocks/mock-api"

test("Checkout page render", async () => {
  const placements = ["cartpage-nosto-1", "cartpage-nosto-2", "cartpage-nosto-3"]
  const mocked = mockApi("cart", placements)
  // @ts-expect-error type mismatch of partial
  window.nostojs = cb => cb(mocked)

  render(
    <NostoProvider
      account="shopify-11368366139"
      recommendationComponent={<RecommendationComponent />}
      loadScript={false}
    >
      <NostoPlacement id="cartpage-nosto-1" />
      <NostoPlacement id="cartpage-nosto-2" />
      <NostoPlacement id="cartpage-nosto-3" />
      <NostoCheckout />
    </NostoProvider>
  )

  await waitForRecommendations(3)

  expect(screen.getAllByTestId("recommendation-product").length).toBe(6)

  const productIds = screen.getAllByTestId("recommendation-product-name").map(el => el.textContent?.trim())

  expect(productIds).toEqual(["Product 1-1", "Product 1-2", "Product 2-1", "Product 2-2", "Product 3-1", "Product 3-2"])

  expect(mocked.getData()).toEqual({
    elements: placements,
    responseMode: "JSON_ORIGINAL",
    variation: "",
    pageType: "cart",
    products: []
  })
})
