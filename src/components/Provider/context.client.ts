import { createContext, useContext } from "react"
import { Recommendation } from "../../types"

/**
 * @group Types
 */
export interface NostoContextType {
  account: string
  clientScriptLoaded: boolean
  currentVariation: string
  renderFunction?: Function
  responseMode: string
  recommendationComponent?: React.ReactElement<{
    nostoRecommendation: Recommendation
  }>
  useRenderCampaigns: Function
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
  useRenderCampaigns: () => undefined,
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
