import { snakeize } from "../utils/snakeize"
import { useRenderCampaigns } from "./useRenderCampaigns"
import { useNostoApi } from "./useNostoApi"
import { ToCamelCase } from "../utils/types"
import { WebsiteOrder as Order } from "@nosto/nosto-js/client"
import { CampaignData } from "../types"

/**
 * @group Hooks
 */
export type NostoOrderProps = {
  order: Order | ToCamelCase<Order>
  placements?: string[]
}

/**
 * @group Api
 */
export type FetchNostoOrderProps = NostoOrderProps & { cb: (data: CampaignData) => void }

/**
 * You can personalise your order-confirmation/thank-you page by using the `useNostoOrder` hook.
 *
 * @group Hooks
 */
export function useNostoOrder({ order, placements }: NostoOrderProps) {
  const { renderCampaigns } = useRenderCampaigns()

  fetchNostoOrder({ order, placements, cb: renderCampaigns })
}

/**
 * fetch Nosto order recommendations using the nosto-js API
 *
 * @group Api
 */
export function fetchNostoOrder({ order, placements, cb }: FetchNostoOrderProps) {
  useNostoApi(
    async api => {
      const data = await api
        .defaultSession()
        .addOrder(snakeize(order))
        .setPlacements(placements || api.placements.getPlacements())
        .load()

      cb(data)
    },
    [order],
    { deep: true }
  )
}
