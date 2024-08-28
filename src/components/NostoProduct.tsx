import { useRenderCampaigns, useNostoApi } from "../hooks"
import { Product } from "../types"

/**
 * @group Components
 */
export type NostoProductProps = {
  product: string
  tagging?: Product
  placements?: string[]
}

/**
 * The NostoProduct component must be used to personalise the product page.
 * The component requires that you provide it the identifier of the current product being viewed.
 *
 * By default, your account, when created, has three product-page placements named `productpage-nosto-1`, `productpage-nosto-2` and `productpage-nosto-3`.
 * You may omit these and use any identifier you need.
 * The identifiers used here are simply provided to illustrate the example.
 *
 * The `<NostoProduct \>` component needs to be added after the placements.
 * Content and recommendations will be rendered through this component.
 * Pass in the product ID via the product prop to pass this information back to Nosto.
 *
 * @example
 * ```
 * <div className="product-page">
 *   <NostoPlacement id="productpage-nosto-1" />
 *   <NostoPlacement id="productpage-nosto-2" />
 *   <NostoPlacement id="productpage-nosto-3" />
 *   <NostoProduct product={product.id} />
 * </div>
 * ```
 *
 * @group Components
 */
export default function NostoProduct(props: NostoProductProps) {
  useNostoProduct(props)
  return null
}

/**
 * You can personalise your product pages by using the useNostoProduct hook.
 * 
 * @group Hooks
 */
export function useNostoProduct(props: NostoProductProps) {
  const { product, tagging, placements } = props
  const { renderCampaigns } = useRenderCampaigns()

  useNostoApi(
    async (api) => {
      const data = await api.defaultSession()
        .viewProduct(tagging ?? product)
        .setPlacements(placements || api.placements.getPlacements())
        .load()
      renderCampaigns(data)
    },
    [product, tagging?.selected_sku_id]
  )
}