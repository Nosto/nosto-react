import { CampaignData } from "../types"
import { useNostoApi } from "./useNostoApi"
import { useRenderCampaigns } from "./useRenderCampaigns"

/**
 * @group Hooks
 */
export type NostoCheckoutProps = { placements?: string[] }

/**
 * @group Api
 */
export type FetchNostoCheckoutProps = NostoCheckoutProps & { cb: (data: CampaignData) => void }

/**
 * You can personalise your cart and checkout pages by using the useNostoCheckout hook.
 *
 * @group Hooks
 */
export function useNostoCheckout(props?: NostoCheckoutProps) {
  const { renderCampaigns } = useRenderCampaigns()

  fetchNostoCheckout({ ...props, cb: renderCampaigns })
}

/**
 * fetch Nosto checkout recommendations using the nosto-js API
 *
 * @group Api
 */
export function fetchNostoCheckout(props?: FetchNostoCheckoutProps) {
  useNostoApi(async api => {
    const data = await api
      .defaultSession()
      .viewCart()
      .setPlacements(props?.placements || api.placements.getPlacements())
      .load()

    props?.cb(data)
  })
}
