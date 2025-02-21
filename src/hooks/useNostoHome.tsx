import { CampaignData } from "../types"
import { useNostoApi } from "./useNostoApi"
import { useRenderCampaigns } from "./useRenderCampaigns"

/**
 * @group Hooks
 */
export type NostoHomeProps = { placements?: string[] }

/**
 * @group Api
 */
export type FetchNostoHomeProps = NostoHomeProps & { cb: (data: CampaignData) => void }

/**
 * You can personalise your home page by using the useNostoHome hook.
 *
 * @group Hooks
 */
export function useNostoHome(props?: NostoHomeProps) {
  const { renderCampaigns } = useRenderCampaigns()
  fetchNostoHome({ ...props, cb: renderCampaigns })
}

/**
 * fetchs Nosto home page recommendations using the nosto-js API
 *
 * @group Api
 */
export function fetchNostoHome(props?: FetchNostoHomeProps) {
  useNostoApi(async api => {
    const data = await api
      .defaultSession()
      .viewFrontPage()
      .setPlacements(props?.placements || api.placements.getPlacements())
      .load()

    props?.cb(data)
  })
}
