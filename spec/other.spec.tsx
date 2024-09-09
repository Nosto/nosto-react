import { test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { NostoProvider, NostoOther, NostoPlacement } from "../src/index"
import RecommendationComponent from "./renderer"
import { waitForRecommendations } from "./utils"
import mockApi from "./mocks/mock-api"

test("Other page render", async () => {
  const placements = ["cartpage-nosto-1", "categorypage-nosto-1", "productpage-nosto-1", "productpage-nosto-2"]
  const mocked = mockApi(placements)
  window.nostojs = cb => cb(mocked)

  render(
    <NostoProvider account="dummy-account" recommendationComponent={<RecommendationComponent />} loadScript={false}>
      <NostoPlacement id="cartpage-nosto-1" />
      <NostoPlacement id="categorypage-nosto-1" />
      <NostoPlacement id="productpage-nosto-1" />
      <NostoPlacement id="productpage-nosto-2" />
      <NostoOther />
    </NostoProvider>
  )

  await waitForRecommendations(4)

  expect(screen.getAllByTestId("recommendation-product").length).toBe(8)

  const productIds = screen.getAllByTestId("recommendation-product-name").map(el => el.textContent?.trim())

  expect(productIds).toEqual([
    "Product 1-1",
    "Product 1-2",
    "Product 2-1",
    "Product 2-2",
    "Product 3-1",
    "Product 3-2",
    "Product 4-1",
    "Product 4-2"
  ])

  expect(mocked.getData()).toEqual({
    elements: placements,
    responseMode: "JSON_ORIGINAL",
    pageType: "other",
    variation: ""
  })
})
