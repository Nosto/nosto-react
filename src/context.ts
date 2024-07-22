import { createContext } from "react"
import { NostoClient, Recommendation, RenderMode } from "./types"

type AnyFunction = (...args: unknown[]) => unknown

/**
 * @group Types
 */
export interface NostoContextType {
  account: string
  clientScriptLoaded: boolean
  currentVariation?: string
  renderFunction?: AnyFunction
  responseMode: RenderMode
  recommendationComponent?: React.ReactElement<{
    nostoRecommendation: Recommendation
  }>
  useRenderCampaigns(type: string): {
    renderCampaigns(data: unknown, api: NostoClient): void
    pageTypeUpdated: boolean
  }
  pageType: string
}

/**
 * @group Essential Functions
 */
export const NostoContext = createContext<NostoContextType>({
  account: "",
  currentVariation: "",
  pageType: "",
  responseMode: "HTML",
  clientScriptLoaded: false,
  useRenderCampaigns: () => {
    return {
      renderCampaigns: () => {},
      pageTypeUpdated: false,
    }
  },
})

