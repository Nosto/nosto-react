import { test, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import { NostoProvider, NostoHome, NostoPlacement } from "../src/index"
import RecommendationComponent from "./renderer"
import { waitForRecommendations } from "./utils"
import { jsonMockDataForPage } from "./mocks"

test("Home page render", async () => {
  const actionMock = {
    load: () => Promise.resolve(jsonMockDataForPage("front")),
    setPlacements: vi.fn()
  }

  const sessionMock = {
    setVariation: this,
    setResponseMode: vi.fn(),
    viewFrontPage: () => actionMock
  }

  const mockApi = {
    placements: {
      injectCampaigns: vi.fn(),
      getPlacements: () => ["frontpage-nosto-1", "frontpage-nosto-2"]
    },
    defaultSession: () => ({
      setVariation: (variation: string) => sessionMock,
      setResponseMode: (mode: string) => sessionMock,
      viewFrontPage: () => ({
        setPlacements: (placements: string[] = []) => actionMock,
        load: () => Promise.resolve(jsonMockDataForPage("front"))
      })
    })
  }

  // @ts-expect-error type mismatch of partial
  window.nostojs = cb => cb(mockApi)

  render(
    <NostoProvider account="shopify-00000" recommendationComponent={<RecommendationComponent />} loadScript={false}>
      <NostoPlacement id="frontpage-nosto-1" />
      <NostoPlacement id="frontpage-nosto-2" />
      <NostoHome />
    </NostoProvider>
  )

  await waitForRecommendations(2)

  expect(screen.getAllByTestId("recommendation-product").length).toEqual(4)

  const productIds = screen.getAllByTestId("recommendation-product-name").map(el => el.textContent?.trim())

  expect(productIds).toEqual(["Product 1-1", "Product 1-2", "Product 2-1", "Product 2-2"])
})
