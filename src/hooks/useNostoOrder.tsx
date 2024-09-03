import { snakeize } from "../utils/snakeize"
import { Order } from "../types"
import { useRenderCampaigns } from "./useRenderCampaigns"
import { useNostoApi } from "./useNostoApi"

/**
 * @group Hooks
 */
export type NostoOrderProps = {
  order: Order
  placements?: string[]
}

/**
 * You can personalise your order-confirmation/thank-you page by using the `useNostoOrder` hook.
 *
 * @group Hooks
 */
export function useNostoOrder({ order, placements }: NostoOrderProps) {
  const { renderCampaigns } = useRenderCampaigns()

  useNostoApi(
    async api => {
      const data = await api
        .defaultSession()
        .addOrder(snakeize(order))
        .setPlacements(placements || api.placements.getPlacements())
        .load()
      renderCampaigns(data)
    },
    [order],
    { deep: true }
  )
}
