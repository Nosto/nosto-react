import { test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { NostoProvider, NostoSearch, NostoPlacement } from "../src/index"
import RecommendationComponent from "./renderer"
import { waitForRecommendations } from "./utils"
import mockApi from "./mocks/mock-api"
import { mockNostojs } from "@nosto/nosto-js/testing"

test("Search page render", async () => {
  const placements = ["searchpage-nosto-1", "searchpage-nosto-2"]
  const mocked = mockApi(placements)
  mockNostojs(mocked)

  render(
    <NostoProvider account="dummy-account" recommendationComponent={<RecommendationComponent />} loadScript={false}>
      <NostoPlacement id="searchpage-nosto-1" />
      <NostoPlacement id="searchpage-nosto-2" />
      <NostoSearch query="" />
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
    pageType: "search",
    searchTerms: [""]
  })
})
