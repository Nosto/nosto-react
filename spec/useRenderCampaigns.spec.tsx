import { act } from "react-dom/test-utils"
import { useRenderCampaigns } from "../src/hooks/useRenderCampaigns"
import { renderHook } from "@testing-library/react"
import { describe, beforeEach, it, expect, vi } from "vitest"
import RecommendationComponent from "./renderer"
import { ActionResponse } from "../src/types"
import { ReactNode } from "react"
import { NostoContext } from "../src/context"

describe("useRenderCampaigns", () => {

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="frontpage-nosto-1"></div>
      <div id="frontpage-nosto-2"></div>`
  })

  it("supports component rendering", async () => {
    function Wrapper({ children }: { children: ReactNode }) {
      return (
        <NostoContext.Provider value={{
            account: "dummy",
            clientScriptLoaded: true, 
            responseMode: "JSON_ORIGINAL", 
            recommendationComponent: <RecommendationComponent /> 
          }}>
          { children }
      </NostoContext.Provider>)
    }

    const { result } = renderHook(() => useRenderCampaigns(), { wrapper: Wrapper })

    act(() => {
      // @ts-expect-error type mismatch of partial
      result.current.renderCampaigns(jsonMockData())
    })

    expect(document.getElementById("frontpage-nosto-1")!.innerHTML).not.toBe("")
    expect(document.getElementById("frontpage-nosto-2")!.innerHTML).not.toBe("")
  })

  it("throws when Nosto is not initialized", () => {
    const { result } = renderHook(() => useRenderCampaigns())

    expect(() => {
      // @ts-expect-error type mismatch of partial
      result.current.renderCampaigns(htmlMockData)
    }).toThrow("Nosto has not yet been initialized")
  })

  it("supports placement injection", async () => {
    function Wrapper({ children }: { children: ReactNode }) {
      return (
        <NostoContext.Provider value={{
          account: "dummy",
          clientScriptLoaded: true,
          responseMode: "HTML"
        }}>
          { children }
        </NostoContext.Provider>
      )
    }

    const { result } = renderHook(() => useRenderCampaigns(), { wrapper: Wrapper })

    const mockApi = {
      placements: {
        injectCampaigns: vi.fn()
      }
    }
    // @ts-expect-error type mismatch of partial
    window.nostojs = cb => cb(mockApi)

    act(() => {
      // @ts-expect-error type mismatch of partial
      result.current.renderCampaigns(htmlMockData())
    })

    expect(mockApi.placements.injectCampaigns).toHaveBeenCalledWith(htmlMockData().recommendations)
  })
})

function jsonCampaign(num: number) {
  return {
    title: `Campaign ${num}`,
    products: [ { name: `Product ${num}-1` }, { name: `Product ${num}-2` } ]
  }
}

function jsonMockData() {
  return {
    campaigns: {
      recommendations: {
        "frontpage-nosto-1": jsonCampaign(1),
        "frontpage-nosto-2": jsonCampaign(2)
      },
      content: {}
    }
  } satisfies Partial<ActionResponse>
}

function htmlMockData() {
  return {
    recommendations: {
      "frontpage-nosto-1": "<div>Campaign 1</div>",
      "frontpage-nosto-2": "<div>Campaign 2</div>",
    }
  } satisfies Partial<ActionResponse>
}