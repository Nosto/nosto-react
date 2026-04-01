import { createContext, Dispatch, ReactElement, SetStateAction } from "react"
import { Recommendation } from "./types"
import { RenderMode } from "@nosto/nosto-js/client"

export type RecommendationComponent = ReactElement<{
  nostoRecommendation: Recommendation
}>

export interface ClientSidePlacement {
  element: Element
  recommendation: Recommendation
}

export const ClientSidePlacementsContext = createContext<Dispatch<SetStateAction<Record<string, ClientSidePlacement>>> | null>(null)

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
