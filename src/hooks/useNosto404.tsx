import { CampaignData } from "../types"
import { useNostoApi } from "./useNostoApi"
import { useRenderCampaigns } from "./useRenderCampaigns"

/**
 * @group Hooks
 */
export type Nosto404Props = { placements?: string[] }

/**
 * @group Api
 */
export type FetchNosto404Props = Nosto404Props & { cb: (data: CampaignData) => void }

/**
 * You can personalise your cart and checkout pages by using the `useNosto404` hook.
 *
 * @group Hooks
 */
export function useNosto404(props?: Nosto404Props) {
  const { renderCampaigns } = useRenderCampaigns()

  fetchNosto404({ ...props, cb: renderCampaigns })
}

/**
 * fetch Nosto 404 page recommendations using the nosto-js API
 *
 * @group Api
 */
export function fetchNosto404(props?: FetchNosto404Props) {
  useNostoApi(async api => {
    const data = await api
      .defaultSession()
      .viewNotFound()
      .setPlacements(props?.placements || api.placements.getPlacements())
      .load()

    props?.cb(data)
  })
}
