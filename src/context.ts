import { createContext, ReactElement, ReactPortal } from "react"
import { Recommendation } from "./types"
import { RenderMode } from "@nosto/nosto-js/client"

export type RecommendationComponent = ReactElement<{
  nostoRecommendation: Recommendation
}>

/**
 * @group Types
 */
export interface NostoContextType {
  account: string
  clientScriptLoaded: boolean
  currentVariation?: string
  renderFunction?: (...args: unknown[]) => unknown
  responseMode: RenderMode
  recommendationComponent?: RecommendationComponent
  setPortals?: (portals: ReactPortal[]) => void
}

/**
 * @group Essential Functions
 */
export const NostoContext = createContext<NostoContextType>({
  account: "",
  currentVariation: "",
  responseMode: "HTML",
  clientScriptLoaded: false
})
