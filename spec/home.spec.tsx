import { test, expect } from "vitest"
import { render, screen, waitFor } from "@testing-library/react"
import { NostoProvider, NostoHome, NostoPlacement } from "../src/index"
import RecommendationComponent from "./renderer"
import { WAIT_FOR_TIMEOUT } from "./utils"

test("Home page render", async () => {
  render(
    <NostoProvider account="shopify-11368366139" recommendationComponent={<RecommendationComponent />}>
      <NostoPlacement id="frontpage-nosto-1" />
      <NostoPlacement id="frontpage-nosto-3" />
      <NostoPlacement id="frontpage-nosto-4" />
      <NostoHome />
    </NostoProvider>
  )

  await waitFor(
    () => {
      expect(screen.getAllByTestId("recommendation")).toHaveLength(3)
    },
    { timeout: WAIT_FOR_TIMEOUT }
  )

  expect(screen.getAllByTestId("recommendation-product").length).toBeGreaterThanOrEqual(3)

  screen.getAllByTestId("recommendation-product-name").forEach(el => {
    expect(el.textContent?.trim().length).toBeGreaterThan(5)
  })
})
