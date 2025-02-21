import { cloneElement, useRef } from "react"
import { createRoot, Root } from "react-dom/client"
import { CampaignData, Recommendation } from "../types"
import { useNostoContext } from "./useNostoContext"
import { RecommendationComponent } from "../context"
import { API } from "@nosto/nosto-js/client"
import { nostojs } from "@nosto/nosto-js"

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

function injectContentCampaigns(data: CampaignData) {
  injectPlacements(data.campaigns?.content ?? {})
}

export function useRenderCampaigns() {
  const { responseMode, recommendationComponent } = useNostoContext()
  const placementRefs = useRef<Record<string, Root>>({})

  if (responseMode == "HTML") {
    return { renderCampaigns: injectCampaigns }
  }

  function renderCampaigns(data: CampaignData) {
    // inject Onsite content campaigns directly
    injectContentCampaigns(data)

    // render recommendation component into placements:
    const recommendations = data.campaigns?.recommendations ?? {}
    for (const key in recommendations) {
      const recommendation = recommendations[key] as Recommendation
      const placementSelector = "#" + key
      const placementElement = document.querySelector<HTMLElement>(placementSelector)

      if (placementElement) {
        if (!placementRefs.current[key]) {
          placementRefs.current[key] = createRoot(placementElement)
        }
        const root = placementRefs.current[key]!

        root.render(
          <RecommendationComponentWrapper
            recommendationComponent={recommendationComponent!}
            nostoRecommendation={recommendation}
          />
        )
      }
    }
  }

  return { renderCampaigns }
}
