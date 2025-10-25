import { snakeize } from "../utils/snakeize"
import { useRenderCampaigns } from "./useRenderCampaigns"
import { useNostoApi } from "./useNostoApi"
import { ToCamelCase } from "../utils/types"
import { WebsiteOrder as Order } from "@nosto/nosto-js/client"

/**
 * @group Hooks
 */
export type NostoOrderProps = {
  order: Order | ToCamelCase<Order>
  placements?: string[]
}

/**
 * You can personalise your order-confirmation/thank-you page by using the `useNostoOrder` hook.
 *
 * @example Basic order confirmation page usage
 * ```tsx
 * import { useNostoOrder } from '@nosto/nosto-react'
 * 
 * function OrderConfirmationPage({ order }: { order: Order }) {
 *   useNostoOrder({
 *     order: order,
 *     placements: ['orderconfirm-nosto-1', 'orderconfirm-cross-sell']
 *   })
 * 
 *   return (
 *     <div>
 *       <h1>Order Confirmed!</h1>
 *       <p>Order #{order.order_number}</p>
 *       <div id="orderconfirm-cross-sell" />
 *       <div id="orderconfirm-nosto-1" />
 *     </div>
 *   )
 * }
 * ```
 * 
 * @example Complete order with camelCase conversion
 * ```tsx
 * import { useNostoOrder } from '@nosto/nosto-react'
 * 
 * function ThankYouPage({ orderData }: { orderData: ToCamelCase<Order> }) {
 *   useNostoOrder({
 *     order: {
 *       orderNumber: orderData.orderNumber,
 *       customerEmail: orderData.customerEmail,
 *       purchasedItems: orderData.purchasedItems.map(item => ({
 *         productId: item.productId,
 *         skuId: item.skuId,
 *         name: item.name,
 *         unitPrice: item.unitPrice,
 *         quantity: item.quantity
 *       }))
 *     },
 *     placements: ['thankyou-recommendations', 'thankyou-reviews']
 *   })
 * 
 *   return (
 *     <div>
 *       <h1>Thank you for your purchase!</h1>
 *       <div id="thankyou-recommendations" />
 *       <div id="thankyou-reviews" />
 *     </div>
 *   )
 * }
 * ```
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
