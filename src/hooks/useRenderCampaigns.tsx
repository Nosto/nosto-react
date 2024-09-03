import { cloneElement, useRef } from "react"
import { createRoot, Root } from "react-dom/client"
import { ActionResponse, Recommendation } from "../types"
import { useNostoContext } from "./useNostoContext"
import { RecommendationComponent } from "../context"

type CampaignData = Pick<ActionResponse, "campaigns" | "recommendations">

// RecommendationComponent for client-side rendering:
function RecommendationComponentWrapper(props: {
  recommendationComponent: RecommendationComponent
  nostoRecommendation: Recommendation
}) {
  return cloneElement(props.recommendationComponent, {
    // eslint-disable-next-line react/prop-types
    nostoRecommendation: props.nostoRecommendation
  })
}

function injectCampaigns(data: CampaignData) {
  if (!window.nostojs) {
    throw new Error("Nosto has not yet been initialized")
  }
  window.nostojs(api => {
    api.placements.injectCampaigns(data.recommendations)
  })
}

export function useRenderCampaigns() {
  const { responseMode, recommendationComponent } = useNostoContext()
  const placementRefs = useRef<Record<string, Root>>({})

  if (responseMode == "HTML") {
    return { renderCampaigns: injectCampaigns }
  }

  function renderCampaigns(data: CampaignData) {
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
