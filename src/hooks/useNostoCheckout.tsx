import { useNostoApi } from "./useNostoApi"
import { useRenderCampaigns } from "./useRenderCampaigns"

/**
 * @group Hooks
 */
export type NostoCheckoutProps = { placements?: string[] }

/**
 * You can personalise your cart and checkout pages by using the useNostoCheckout hook.
 *
 * @example Basic cart page usage
 * ```tsx
 * import { useNostoCheckout } from '@nosto/nosto-react'
 * 
 * function CartPage() {
 *   useNostoCheckout({
 *     placements: ['cartpage-nosto-1', 'cartpage-cross-sell']
 *   })
 * 
 *   return (
 *     <div>
 *       <h1>Your Cart</h1>
 *       {/\* Cart items here *\/}
 *       <div id="cartpage-cross-sell" />
 *       <div id="cartpage-nosto-1" />
 *     </div>
 *   )
 * }
 * ```
 * 
 * @example Checkout page with recommendations
 * ```tsx
 * import { useNostoCheckout } from '@nosto/nosto-react'
 * 
 * function CheckoutPage() {
 *   useNostoCheckout({
 *     placements: ['checkout-upsell', 'checkout-last-chance']
 *   })
 * 
 *   return (
 *     <div>
 *       <h1>Checkout</h1>
 *       <div id="checkout-upsell" />
 *       {/\* Checkout form here *\/}
 *       <div id="checkout-last-chance" />
 *     </div>
 *   )
 * }
 * ```
 *
 * @group Hooks
 */
export function useNostoCheckout(props?: NostoCheckoutProps) {
  const { renderCampaigns } = useRenderCampaigns()

  useNostoApi(async api => {
    const data = await api
      .defaultSession()
      .viewCart()
      .setPlacements(props?.placements || api.placements.getPlacements())
      .load()
    renderCampaigns(data)
  })
}
