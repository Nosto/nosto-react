import { useRenderCampaigns, useNostoApi } from "../hooks"

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
 * @group Components
 */
export default function NostoSearch(props: { query: string; placements?: string[] }) {
  const { query, placements } = props
  const { renderCampaigns } = useRenderCampaigns()

  useNostoApi(
    async (api) => {
      const data = await api.defaultSession()
        .viewSearch(query)
        .setPlacements(placements || api.placements.getPlacements())
        .load()
      renderCampaigns(data, api)
    },
    [query]
  )
  return null
}
