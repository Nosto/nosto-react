import { useContext } from "react"
import { Recommendation } from "../types"
import { useNostoContext } from "./useNostoContext"
import { ClientSidePlacementsContext } from "../context"
import { ActionResponse, API } from "@nosto/nosto-js/client"
import { nostojs } from "@nosto/nosto-js"

type CampaignData = Pick<ActionResponse, "campaigns" | "recommendations">

function injectPlacements(data: Record<string, unknown>) {
  nostojs(api => api.placements.injectCampaigns(data as Parameters<API["placements"]["injectCampaigns"]>[0]))
}

function injectCampaigns(data: CampaignData) {
  // @ts-expect-error not defined
  if (!window.nostojs) {
    throw new Error("Nosto has not yet been initialized")
  }
  injectPlacements(data.recommendations)
}

/**
 * Hook for rendering Nosto campaigns and recommendations. Handles both HTML and client-side rendering modes.
 * This hook is typically used internally by other Nosto hooks but can be used directly for custom implementations.
 * 
 * @example Basic usage with HTML mode
 * ```tsx
 * import { useRenderCampaigns } from '@nosto/nosto-react'
 * 
 * function CustomRecommendations() {
 *   const { renderCampaigns } = useRenderCampaigns()
 * 
 *   useEffect(() => {
 *     // When using HTML response mode, campaigns are injected as HTML
 *     const campaignData = {
 *       campaigns: {
 *         content: {
 *           'my-placement-id': '<div>Nosto content</div>'
 *         }
 *       },
 *       recommendations: {}
 *     }
 *     renderCampaigns(campaignData)
 *   }, [renderCampaigns])
 * 
 *   return <div id="my-placement-id" />
 * }
 * ```
 * 
 * @example Client-side rendering with React components
 * ```tsx
 * import { useRenderCampaigns } from '@nosto/nosto-react'
 * 
 * function ClientSideRecommendations() {
 *   const { renderCampaigns } = useRenderCampaigns()
 * 
 *   useEffect(() => {
 *     // When using client-side rendering, recommendations are rendered as React components
 *     const campaignData = {
 *       campaigns: {
 *         recommendations: {
 *           'my-placement-id': {
 *             result_id: 'abc123',
 *             products: [
 *               { product_id: '1', name: 'Product 1', url: '/product/1' },
 *               { product_id: '2', name: 'Product 2', url: '/product/2' }
 *             ]
 *           }
 *         }
 *       },
 *       recommendations: {}
 *     }
 *     renderCampaigns(campaignData)
 *   }, [renderCampaigns])
 * 
 *   return <div id="my-placement-id" />
 * }
 * ```
 * 
 * @group Hooks
 */
export function useRenderCampaigns() {
  const { responseMode, recommendationComponent } = useNostoContext()
  const setClientSidePlacements = useContext(ClientSidePlacementsContext)

  if (responseMode == "HTML") {
    return { renderCampaigns: injectCampaigns }
  }

  if (!recommendationComponent) {
    throw new Error("recommendationComponent is required for client-side rendering using hook")
  }

  function renderCampaigns(data: CampaignData) {
    // inject Onsite content campaigns directly
    injectPlacements(data.campaigns?.content ?? {})

    // render recommendation component into placements via portals in NostoProvider:
    const recommendations = data.campaigns?.recommendations ?? {}
    const newPlacements: Record<string, { element: Element; recommendation: Recommendation }> = {}
    for (const key in recommendations) {
      const recommendation = recommendations[key] as Recommendation
      const placementElement = document.querySelector("#" + key)
      if (placementElement) {
        newPlacements[key] = { element: placementElement, recommendation }
      }
    }
    setClientSidePlacements?.(newPlacements)
  }

  return { renderCampaigns }
}
