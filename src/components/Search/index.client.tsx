import { useEffect } from "react"
import { useNostoContext } from "../Provider/context.client"

/**
 * You can personalise your search pages by using the NostoSearch component.
 * The component requires that you provide it the current search term.
 *
 * By default, your account, when created, has two search-page placements named `searchpage-nosto-1` and `searchpage-nosto-2`.
 * You may omit these and use any identifier you need. The identifiers used here are simply provided to illustrate the example.
 *
 * @example
 * ```
 * <div className="search-page">
 *   <NostoPlacement id="searchpage-nosto-1" />
 *   <NostoPlacement id="searchpage-nosto-2" />
 *   <NostoSearch query={"black shoes"} />
 * </div>
 * ```
 *
 * **Note:** Do not encode the search term in any way.
 * It should be provided an unencoded string.
 * A query for `black shoes` must be provided as-is and not as `black+shoes`.
 * Doing so will lead to invalid results.
 *
 * @group Personalisation Components
 */
export default function NostoSearch(props: {
  query: string
  placements?: string[]
}): JSX.Element {
  const { query } = props
  const {
    clientScriptLoaded,
    currentVariation,
    responseMode,
    recommendationComponent,
    useRenderCampaigns,
  } = useNostoContext()

  const { renderCampaigns, pageTypeUpdated } = useRenderCampaigns("search")

  useEffect(() => {
    if (clientScriptLoaded && pageTypeUpdated) {
      window.nostojs(api => {
        api
          .defaultSession()
          .setVariation(currentVariation)
          .setResponseMode(responseMode)
          .viewSearch(query)
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
    query,
    recommendationComponent,
    pageTypeUpdated,
  ])

  return (
    <>
      <div className="nosto_page_type" style={{ display: "none" }}>
        search
      </div>
      <div className="nosto_search" style={{ display: "none" }}>
        {query}
      </div>
    </>
  )
}
