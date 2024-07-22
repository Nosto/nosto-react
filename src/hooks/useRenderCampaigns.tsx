import { useRef } from "react"
import { createRoot, Root } from "react-dom/client"
import { ActionResponse, NostoClient, Recommendation } from "../types"
import { useNostoContext } from "./useNostoContext"
import React from "react"
import { RecommendationComponent } from "../context"

// RecommendationComponent for client-side rendering:
function RecommendationComponentWrapper(props: { 
    recommendationComponent: RecommendationComponent,
    nostoRecommendation: Recommendation }) {

  return React.cloneElement(props.recommendationComponent, {
    // eslint-disable-next-line react/prop-types
    nostoRecommendation: props.nostoRecommendation,
  })
}

function injectCampaigns(data: ActionResponse, api: NostoClient) {
  api.placements.injectCampaigns(data.recommendations)
}

export function useRenderCampaigns() {
  const { responseMode, recommendationComponent } = useNostoContext()
  const placementRefs = useRef<Record<string, Root>>({})

  if (responseMode == "HTML") {
    return { renderCampaigns: injectCampaigns }
  }

  function renderCampaigns(data: ActionResponse) {
    // render recommendation component into placements:
    const recommendations = data.campaigns?.recommendations ?? {}
    for (const key in recommendations) {
      const recommendation = recommendations[key] as Recommendation
      const placementSelector = "#" + key
      const placementElement = document.querySelector(placementSelector)

      if (placementElement) {
        if (!placementRefs.current[key]) {
          placementRefs.current[key] = createRoot(placementElement)
        }
        const root = placementRefs.current[key]!
        root.render(
          <RecommendationComponentWrapper
            recommendationComponent={recommendationComponent!}
            nostoRecommendation={recommendation}
          ></RecommendationComponentWrapper>
        )
      }
    }
  }

  return { renderCampaigns }
}