import { CampaignData } from "../types"
import { useNostoApi } from "./useNostoApi"
import { useRenderCampaigns } from "./useRenderCampaigns"
import { Product } from "@nosto/nosto-js/client"

/**
 * @group Hooks
 */
export type NostoProductProps = {
  product: string
  reference?: string
  tagging?: Product
  placements?: string[]
}

/**
 * @group Api
 */
export type FetchNostoProductProps = NostoProductProps & { cb: (data: CampaignData) => void }

/**
 * You can personalise your product pages by using the useNostoProduct hook.
 *
 * @group Hooks
 */
export function useNostoProduct(props: NostoProductProps) {
  const { renderCampaigns } = useRenderCampaigns()

  if (props.tagging && !props.tagging.product_id) {
    throw new Error("The product object must contain a product_id property")
  }

  fetchNostoProduct({ ...props, cb: renderCampaigns })
}

/**
 * fetch Nosto product recommendations using the nosto-js API
 *
 * @group Api
 */
export function fetchNostoProduct({ product, tagging, placements, reference, cb }: FetchNostoProductProps) {
  const productId = tagging?.product_id ?? product

  useNostoApi(
    async api => {
      const action = api
        .defaultSession()
        .viewProduct(tagging ?? product)
        .setPlacements(placements || api.placements.getPlacements())
      if (reference) {
        action.setRef(productId, reference)
      }
      const data = await action.load()
      cb(data)
    },
    [productId, tagging?.selected_sku_id]
  )
}
