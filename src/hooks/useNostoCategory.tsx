import { CampaignData } from "../types"
import { useNostoApi } from "./useNostoApi"
import { useRenderCampaigns } from "./useRenderCampaigns"

/**
 * @group Hooks
 */
export type NostoCategoryProps = {
  category: string
  placements?: string[]
}

/**
 * @group Api
 */
export type FetchNostoCategoryProps = NostoCategoryProps & { cb: (data: CampaignData) => void }

/**
 * You can personalise your category and collection pages by using the useNostoCategory hook.
 *
 * @group Hooks
 */
export function useNostoCategory(props: NostoCategoryProps) {
  const { renderCampaigns } = useRenderCampaigns()

  fetchNostoCategory({ ...props, cb: renderCampaigns })
}

/**
 * fetch Nosto category recommendations using the nosto-js API
 *
 * @group Api
 */
export function fetchNostoCategory({ category, placements, cb }: FetchNostoCategoryProps) {
  useNostoApi(
    async api => {
      const data = await api
        .defaultSession()
        .viewCategory(category)
        .setPlacements(placements || api.placements.getPlacements())
        .load()

      cb(data)
    },
    [category]
  )
}
