import { test, expect } from "vitest"
import { render, screen, waitFor } from "@testing-library/react"
import { NostoProvider, NostoCategory, NostoPlacement } from "../src/index"
import RecommendationComponent from "./renderer"
import { expectRecommendations, waitForOptions } from "./utils"

test("Category page render", async () => {
  render(
    <NostoProvider account="shopify-11368366139" recommendationComponent={<RecommendationComponent />}>
      <NostoPlacement id="categorypage-nosto-1" />
      <NostoPlacement id="categorypage-nosto-2" />
      <NostoCategory category="Rings" />
    </NostoProvider>
  )

  await waitFor(
    () => expectRecommendations(2),
    waitForOptions
  )

  expect(screen.getAllByTestId("recommendation-product").length).toBeGreaterThanOrEqual(3)

  screen.getAllByTestId("recommendation-product-name").forEach(el => {
    expect(el.textContent?.trim().length).toBeGreaterThan(5)
  })
})
