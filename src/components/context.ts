import { createContext, useContext } from "react"
import { NostoClient, Recommendation, RenderMode } from "../types"

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

/**
 * A hook that allows you to access the NostoContext and retrieve Nosto-related data from it in React components.
 *
 * @group Essential Functions
 */
export function useNostoContext(): NostoContextType {
  const context = useContext(NostoContext)

  if (!context) {
    throw new Error("No nosto context found")
  }

  return context
}
