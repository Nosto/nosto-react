import { test, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { NostoProvider, Nosto404, NostoPlacement } from "../src/index"
import RecommendationComponent from "./renderer"
import { waitForRecommendations } from "./utils"

test("404 page render", async () => {
  render(
    <NostoProvider account="shopify-11368366139" recommendationComponent={<RecommendationComponent />}>
      <NostoPlacement id="notfound-nosto-1" />
      <NostoPlacement id="notfound-nosto-2" />
      <Nosto404 />
    </NostoProvider>
  )

  await waitForRecommendations(2)

  expect(screen.getAllByTestId("recommendation-product").length).toBeGreaterThanOrEqual(3)

  screen.getAllByTestId("recommendation-product-name").forEach(el => {
    expect(el.textContent?.trim().length).toBeGreaterThan(5)
  })
})
