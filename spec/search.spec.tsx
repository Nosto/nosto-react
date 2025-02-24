import { test, expect, describe, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { NostoProvider, NostoSearch, NostoPlacement, Recommendation } from "../src/index"
import RecommendationComponent from "./renderer"
import { waitForRecommendations } from "./utils"
import mockApi from "./mocks/mock-api"
import { mockNostojs } from "@nosto/nosto-js/testing"
import { ActionResponse } from "@nosto/nosto-js/client"
import { nostojs } from "@nosto/nosto-js"

describe("Search page render", async () => {
  it("with recommendationComponent", async () => {
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

  it("throws when renderMode property used with hook", async () => {
    const placements = ["searchpage-nosto-1", "searchpage-nosto-2"]
    const mocked = mockApi(placements)
    mockNostojs(mocked)

    expect(() =>
      render(
        <NostoProvider account="dummy-account" renderMode="JSON_ORIGINAL" loadScript={false}>
          <NostoPlacement id="searchpage-nosto-1" />
          <NostoPlacement id="searchpage-nosto-2" />
          <NostoSearch query="" />
        </NostoProvider>
      )
    ).toThrowError("recommendationComponent is required for client-side rendering using hook")
  })

  it("with renderMode property", async () => {
    const placements = ["searchpage-nosto-1", "searchpage-nosto-2"]
    const mocked = mockApi(placements)
    mockNostojs(mocked)

    const result = await new Promise<ActionResponse>(resolve =>
      nostojs(async api => {
        const data = await api.defaultSession().viewSearch("").setPlacements(placements).load()
        resolve(data)
      })
    )

    const searchPageNosto1 = result.campaigns?.recommendations["searchpage-nosto-1"] as Recommendation
    const searchPageNosto2 = result.campaigns?.recommendations["searchpage-nosto-2"] as Recommendation

    render(
      <NostoProvider account="dummy-account" renderMode="JSON_ORIGINAL" loadScript={false}>
        <NostoPlacement id="searchpage-nosto-1">
          <RecommendationComponent nostoRecommendation={searchPageNosto1} />
        </NostoPlacement>
        <NostoPlacement id="searchpage-nosto-2">
          <RecommendationComponent nostoRecommendation={searchPageNosto2} />
        </NostoPlacement>
      </NostoProvider>
    )

    await waitForRecommendations(2)

    expect(screen.getAllByTestId("recommendation-product").length).toBe(4)

    const productNames = screen.getAllByTestId("recommendation-product-name").map(el => el.textContent?.trim())
    expect(productNames).toEqual(["Product 1-1", "Product 1-2", "Product 2-1", "Product 2-2"])

    expect(mocked.getData()).toEqual({
      elements: placements,
      pageType: "search",
      searchTerms: [""]
    })
  })
})
