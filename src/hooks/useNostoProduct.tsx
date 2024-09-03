import { Product } from "../types"
import { useNostoApi } from "./useNostoApi"
import { useRenderCampaigns } from "./useRenderCampaigns"

/**
 * @group Hooks
 */
export type NostoProductProps = {
  product: string
  tagging?: Product
  placements?: string[]
}

/**
 * You can personalise your product pages by using the useNostoProduct hook.
 *
 * @group Hooks
 */
export function useNostoProduct({ product, tagging, placements }: NostoProductProps) {
  const { renderCampaigns } = useRenderCampaigns()

  if (tagging && !tagging.product_id) {
    throw new Error("The product object must contain a product_id property")
  }

  useNostoApi(
    async api => {
      const data = await api
        .defaultSession()
        .viewProduct(tagging ?? product)
        .setPlacements(placements || api.placements.getPlacements())
        .load()
      renderCampaigns(data)
    },
    [product, tagging?.selected_sku_id]
  )
}
