import { createContext } from "react"
import { Recommendation, RenderMode } from "./types"

type AnyFunction = (...args: unknown[]) => unknown

export type RecommendationComponent = React.ReactElement<{
  nostoRecommendation: Recommendation
}>

/**
 * @group Types
 */
export interface NostoContextType {
  account: string
  clientScriptLoaded: boolean
  currentVariation?: string
  renderFunction?: AnyFunction
  responseMode: RenderMode
  recommendationComponent?: RecommendationComponent
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

