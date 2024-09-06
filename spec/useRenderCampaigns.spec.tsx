import { act } from "react-dom/test-utils"
import { useRenderCampaigns } from "../src/hooks/useRenderCampaigns"
import { renderHook } from "@testing-library/react"
import { describe, beforeEach, it, expect, vi } from "vitest"
import RecommendationComponent from "./renderer"
import { createWrapper } from "./utils"
import { htmlMockDataForPage, jsonMockDataForPage } from "./mocks"

describe("useRenderCampaigns", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="frontpage-nosto-1"></div>
      <div id="frontpage-nosto-2"></div>`
  })

  it("supports component rendering", async () => {
    const wrapper = createWrapper({
      account: "dummy",
      clientScriptLoaded: true,
      responseMode: "JSON_ORIGINAL",
      recommendationComponent: <RecommendationComponent />
    })
    const { result } = renderHook(() => useRenderCampaigns(), { wrapper })

    act(() => {
      result.current.renderCampaigns(jsonMockDataForPage("front"))
    })

    expect(document.getElementById("frontpage-nosto-1")!.innerHTML).not.toBe("")
    expect(document.getElementById("frontpage-nosto-2")!.innerHTML).not.toBe("")
  })

  it("throws when Nosto is not initialized", () => {
    const { result } = renderHook(() => useRenderCampaigns())

    expect(() => {
      result.current.renderCampaigns(htmlMockDataForPage("front"))
    }).toThrow("Nosto has not yet been initialized")
  })

  it("supports placement injection", async () => {
    const wrapper = createWrapper({
      account: "dummy",
      clientScriptLoaded: true,
      responseMode: "HTML"
    })
    const { result } = renderHook(() => useRenderCampaigns(), { wrapper })

    const mockApi = {
      placements: {
        injectCampaigns: vi.fn()
      }
    }
    // @ts-expect-error type mismatch of partial
    window.nostojs = cb => cb(mockApi)

    act(() => {
      result.current.renderCampaigns(htmlMockDataForPage("front"))
    })

    expect(mockApi.placements.injectCampaigns).toHaveBeenCalledWith(htmlMockDataForPage("front").recommendations)
  })
})
