import { test, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { NostoProvider, NostoHome, NostoPlacement } from "../src/index"
import RecommendationComponent from "./renderer"
import { waitForRecommendations } from "./utils"
import mockApi from "./mocks/mock-api"

test("Home page render", async () => {
  const placements = ["frontpage-nosto-1", "frontpage-nosto-2"]
  const mocked = mockApi(placements)
  window.nostojs = cb => cb(mocked)

  render(
    <NostoProvider account="dummy-account" recommendationComponent={<RecommendationComponent />} loadScript={false}>
      <NostoPlacement id="frontpage-nosto-1" />
      <NostoPlacement id="frontpage-nosto-2" />
      <NostoHome />
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
    pageType: "front"
  })
})
