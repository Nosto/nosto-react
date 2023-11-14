import { useEffect } from "react"
import { useNostoContext } from "../Provider/context.client"

/**
 * The `NostoHome` component must be used to personalise the home page. The component does not require any props.
 *
 * By default, your account, when created, has four front-page placements named `frontpage-nosto-1`, `frontpage-nosto-2`, `frontpage-nosto-3` and `frontpage-nosto-4`.
 * You may omit these and use any identifier you need.
 * The identifiers used here are simply provided to illustrate the example.
 *
 * The `<NostoHome \>` component needs to be added after the placements.
 * Content and recommendations will be rendered through this component.
 *
 * @example
 * ```
 *  <div className="front-page">
 *   <NostoPlacement id="frontpage-nosto-1" />
 *   <NostoPlacement id="frontpage-nosto-2" />
 *   <NostoPlacement id="frontpage-nosto-3" />
 *   <NostoPlacement id="frontpage-nosto-4" />
 *   <NostoHome />
 * </div>
 * ```
 *
 * @group Personalisation Components
 */
export default function NostoHome(props: {
  placements?: string[]
}): JSX.Element {
  const {
    clientScriptLoaded,
    currentVariation,
    responseMode,
    recommendationComponent,
    useRenderCampaigns,
  } = useNostoContext()

  const { renderCampaigns, pageTypeUpdated } = useRenderCampaigns("home")

  useEffect(() => {
    if (clientScriptLoaded && pageTypeUpdated) {
      window.nostojs(api => {
        api
          .defaultSession()
          .setVariation(currentVariation)
          .setResponseMode(responseMode)
          .viewFrontPage()
          .setPlacements(props.placements || api.placements.getPlacements())
          .load()
          .then(data => {
            renderCampaigns(data, api)
          })
      })
    }
  }, [
    clientScriptLoaded,
    currentVariation,
    recommendationComponent,
    pageTypeUpdated,
  ])

  return (
    <>
      <div className="nosto_page_type" style={{ display: "none" }}>
        front
      </div>
    </>
  )
}
