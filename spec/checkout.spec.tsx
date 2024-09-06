import { test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { NostoProvider, NostoCheckout, NostoPlacement } from "../src/index"
import RecommendationComponent from "./renderer"
import { waitForRecommendations } from "./utils"
import mockApi from "./mocks/mock-api"

test("Checkout page render", async () => {
  const placements = ["cartpage-nosto-1", "cartpage-nosto-2"]
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

  expect(screen.getAllByTestId("recommendation-product").length).toBeGreaterThanOrEqual(3)

  screen.getAllByTestId("recommendation-product-name").forEach(el => {
    expect(el.textContent?.trim().length).toBeGreaterThan(5)
  })
})
