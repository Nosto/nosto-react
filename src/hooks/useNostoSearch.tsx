import { CampaignData } from "../types"
import { useNostoApi } from "./useNostoApi"
import { useRenderCampaigns } from "./useRenderCampaigns"

/**
 * @group Components
 */
export type NostoSearchProps = {
  query: string
  placements?: string[]
}

/**
 * @group Api
 */
export type FetchNostoSearchProps = NostoSearchProps & { cb: (data: CampaignData) => void }

/**
 * You can personalise your search pages by using the useNostoSearch hook.
 *
 * @group Hooks
 */
export function useNostoSearch(props: NostoSearchProps) {
  const { renderCampaigns } = useRenderCampaigns()

  fetchNostoSearch({ ...props, cb: renderCampaigns })
}

/**
 * fetch Nosto search recommendations using the nosto-js API
 *
 * @group Api
 */
export function fetchNostoSearch({ query, placements, cb }: FetchNostoSearchProps) {
  useNostoApi(
    async api => {
      const data = await api
        .defaultSession()
        .viewSearch(query)
        .setPlacements(placements || api.placements.getPlacements())
        .load()

      cb(data)
    },
    [query]
  )
}
