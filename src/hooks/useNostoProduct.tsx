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
 * You can personalise your product pages by using the useNostoProduct hook.
 *
 * @example Basic product page usage
 * ```tsx
 * import { useNostoProduct } from '@nosto/nosto-react'
 * 
 * function ProductPage({ productId }: { productId: string }) {
 *   useNostoProduct({
 *     product: productId,
 *     placements: ['productpage-nosto-1', 'productpage-nosto-2']
 *   })
 * 
 *   return (
 *     <div>
 *       <h1>Product Details</h1>
 *       <div id="productpage-nosto-1" />
 *       <div id="productpage-nosto-2" />
 *     </div>
 *   )
 * }
 * ```
 * 
 * @example Advanced product page with full tagging
 * ```tsx
 * import { useNostoProduct } from '@nosto/nosto-react'
 * 
 * function AdvancedProductPage({ product }: { product: Product }) {
 *   useNostoProduct({
 *     product: product.id,
 *     reference: `product-${product.id}`,
 *     tagging: {
 *       product_id: product.id,
 *       name: product.name,
 *       url: product.url,
 *       price: product.price,
 *       list_price: product.listPrice,
 *       image_url: product.imageUrl,
 *       categories: product.categories,
 *       brand: product.brand,
 *       selected_sku_id: product.selectedVariant?.id
 *     },
 *     placements: ['productpage-cross-sell', 'productpage-upsell']
 *   })
 * 
 *   return (
 *     <div>
 *       <h1>{product.name}</h1>
 *       <div id="productpage-cross-sell" />
 *       <div id="productpage-upsell" />
 *     </div>
 *   )
 * }
 * ```
 *
 * @group Hooks
 */
export function useNostoProduct({ product, tagging, placements, reference }: NostoProductProps) {
  const { renderCampaigns } = useRenderCampaigns()

  if (tagging && !tagging.product_id) {
    throw new Error("The product object must contain a product_id property")
  }

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
      renderCampaigns(data)
    },
    [productId, tagging?.selected_sku_id]
  )
}
