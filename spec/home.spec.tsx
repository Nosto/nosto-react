import { expect, describe, it } from "vitest"
import { render, screen } from "@testing-library/react"
import { NostoProvider, NostoHome, NostoPlacement, Recommendation } from "../src/index"
import RecommendationComponent from "./renderer"
import { waitForRecommendations } from "./utils"
import mockApi from "./mocks/mock-api"
import { mockNostojs } from "@nosto/nosto-js/testing"
import { nostojs } from "@nosto/nosto-js"
import { ActionResponse } from "@nosto/nosto-js/client"

describe("Home page render", async () => {
  it("with recommendationComponent", async () => {
    const placements = ["frontpage-nosto-1", "frontpage-nosto-2"]
    const mocked = mockApi(placements)
    mockNostojs(mocked)

    render(
      <NostoProvider account="dummy-account" recommendationComponent={<RecommendationComponent />} loadScript={false}>
        <NostoPlacement id="frontpage-nosto-1" />
        <NostoPlacement id="frontpage-nosto-2" />
        <NostoHome />
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
      pageType: "front"
    })
  })

  it("throws when renderMode property used with hook", async () => {
    const placements = ["frontpage-nosto-1", "frontpage-nosto-2"]
    const mocked = mockApi(placements)
    mockNostojs(mocked)

    expect(() =>
      render(
        <NostoProvider account="dummy-account" renderMode="JSON_ORIGINAL" loadScript={false}>
          <NostoPlacement id="frontpage-nosto-1" />
          <NostoPlacement id="frontpage-nosto-2" />
          <NostoHome />
        </NostoProvider>
      )
    ).toThrowError("recommendationComponent is required for client-side rendering using hook")
  })

  it("with renderMode property", async () => {
    const placements = ["frontpage-nosto-1", "frontpage-nosto-2"]
    const mocked = mockApi(placements)
    mockNostojs(mocked)

    const result = await new Promise<ActionResponse>(resolve =>
      nostojs(async api => {
        const data = await api.defaultSession().viewFrontPage().setPlacements(placements).load()
        resolve(data)
      })
    )

    const frontpageNosto1 = result.campaigns?.recommendations["frontpage-nosto-1"] as Recommendation
    const frontpageNosto2 = result.campaigns?.recommendations["frontpage-nosto-2"] as Recommendation

    render(
      <NostoProvider account="dummy-account" renderMode="JSON_ORIGINAL" loadScript={false}>
        <NostoPlacement id="frontpage-nosto-1">
          <RecommendationComponent nostoRecommendation={frontpageNosto1} />
        </NostoPlacement>
        <NostoPlacement id="frontpage-nosto-2">
          <RecommendationComponent nostoRecommendation={frontpageNosto2} />
        </NostoPlacement>
      </NostoProvider>
    )

    await waitForRecommendations(2)

    expect(screen.getAllByTestId("recommendation-product").length).toBe(4)

    const productNames = screen.getAllByTestId("recommendation-product-name").map(el => el.textContent?.trim())
    expect(productNames).toEqual(["Product 1-1", "Product 1-2", "Product 2-1", "Product 2-2"])

    expect(mocked.getData()).toEqual({
      elements: placements,
      pageType: "front"
    })
  })
})
