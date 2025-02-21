import { CampaignData } from "../types"
import { useNostoApi } from "./useNostoApi"
import { useRenderCampaigns } from "./useRenderCampaigns"

/**
 * @group Hooks
 */
export type NostoOtherProps = { placements?: string[] }

/**
 * @group Api
 */
export type FetchNostoOtherProps = NostoOtherProps & { cb: (data: CampaignData) => void }

/**
 * You can personalise your miscellaneous pages by using the useNostoOther hook.
 *
 * @group Hooks
 */
export function useNostoOther(props?: NostoOtherProps) {
  const { renderCampaigns } = useRenderCampaigns()

  fetchNostoOther({ ...props, cb: renderCampaigns })
}

/**
 * fetch Nosto other page recommendations using the nosto-js API
 *
 * @group Api
 */
export function fetchNostoOther(props?: FetchNostoOtherProps) {
  useNostoApi(async api => {
    const data = await api
      .defaultSession()
      .viewOther()
      .setPlacements(props?.placements || api.placements.getPlacements())
      .load()

    props?.cb(data)
  })
}
