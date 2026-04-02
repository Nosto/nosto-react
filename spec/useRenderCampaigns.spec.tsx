import { act } from "react-dom/test-utils"
import { useRenderCampaigns } from "../src/hooks/useRenderCampaigns"
import { render, renderHook } from "@testing-library/react"
import { describe, beforeEach, it, expect } from "vitest"
import RecommendationComponent from "./renderer"
import { createWrapper } from "./utils"
import { htmlMockDataForPage, jsonMockData, mixedMockData } from "./mocks/mock-data"
import mockApi from "./mocks/mock-api"
import { mockNostojs } from "@nosto/nosto-js/testing"
import { NostoProvider } from "../src/components/NostoProvider"

describe("useRenderCampaigns", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="frontpage-nosto-1"></div>
      <div id="frontpage-nosto-2"></div>`
  })

  it("supports component rendering", async () => {
    let capturedRenderCampaigns!: ReturnType<typeof useRenderCampaigns>["renderCampaigns"]

    function TestComponent() {
      const { renderCampaigns } = useRenderCampaigns()
      capturedRenderCampaigns = renderCampaigns
      return null
    }

    render(
      <NostoProvider account="dummy" recommendationComponent={<RecommendationComponent />} loadScript={false}>
        <TestComponent />
      </NostoProvider>
    )

    act(() => {
      capturedRenderCampaigns(jsonMockData(["frontpage-nosto-1", "frontpage-nosto-2"]))
    })

    expect(document.getElementById("frontpage-nosto-1")!.innerHTML).not.toBe("")
    expect(document.getElementById("frontpage-nosto-2")!.innerHTML).not.toBe("")
  })

  it("throws when recommendation component is not supplied", async () => {
    const wrapper = createWrapper({
      account: "dummy",
      clientScriptLoaded: true,
      responseMode: "JSON_ORIGINAL"
    })
    expect(() => renderHook(() => useRenderCampaigns(), { wrapper })).toThrowError(
      "recommendationComponent is required for client-side rendering using hook"
    )
  })

  it("throws when Nosto is not initialized", () => {
    const { result } = renderHook(() => useRenderCampaigns())

    expect(() => {
      result.current.renderCampaigns(htmlMockDataForPage(["frontpage-nosto-1", "frontpage-nosto-2"]))
    }).toThrow("Nosto has not yet been initialized")
  })

  it("supports placement injection", async () => {
    const wrapper = createWrapper({
      account: "dummy",
      clientScriptLoaded: true,
      responseMode: "HTML"
    })
    const { result } = renderHook(() => useRenderCampaigns(), { wrapper })

    const placements = ["frontpage-nosto-1", "frontpage-nosto-2"]

    const mocked = mockApi(placements)
    mockNostojs(mocked)

    act(() => {
      result.current.renderCampaigns(htmlMockDataForPage(placements))
    })

    expect(mocked.placements.injectCampaigns).toHaveBeenCalledWith(htmlMockDataForPage(placements).recommendations)
  })

  it("supports mixed content and recommendations", async () => {
    const wrapper = createWrapper({
      account: "dummy",
      clientScriptLoaded: true,
      responseMode: "JSON_ORIGINAL",
      recommendationComponent: <RecommendationComponent />
    })
    const { result } = renderHook(() => useRenderCampaigns(), { wrapper })

    const placements = ["frontpage-nosto-1", "frontpage-nosto-2"]

    const mocked = mockApi(placements)
    mockNostojs(mocked)

    act(() => {
      result.current.renderCampaigns(mixedMockData(placements))
    })

    expect(mocked.placements.injectCampaigns).toHaveBeenCalledWith(mixedMockData(placements).campaigns.content)
  })
})
