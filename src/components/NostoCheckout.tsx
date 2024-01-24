import { useNostoContext } from "./context"
import { useNostoApi } from "../utils/hooks"

/**
 * You can personalise your cart and checkout pages by using the NostoCheckout component.
 * The component does not require any props.
 *
 * By default, your account, when created, has two cart-page placements named `categorypage-nosto-1` and `categorypage-nosto-2`.
 * You may omit these and use any identifier you need.
 * The identifiers used here are simply provided to illustrate the example.
 *
 * @example
 * ```
 * <div className="checkout-page">
 *   <NostoPlacement id="checkout-nosto-1" />
 *   <NostoPlacement id="checkout-nosto-2" />
 *   <NostoCheckout />
 * </div>
 * ```
 *
 * @group Components
 */

export default function NostoCheckout(props: { placements?: string[] }) {
  const { recommendationComponent, useRenderCampaigns } = useNostoContext()

  const { renderCampaigns, pageTypeUpdated } = useRenderCampaigns("checkout")

  useNostoApi(
    async (api) => {
      const data = await api.defaultSession()
        .viewCart()
        .setPlacements(props.placements || api.placements.getPlacements())
        .load()
      renderCampaigns(data, api)
    },
    [recommendationComponent, pageTypeUpdated]
  )

  return (
    <>
      <div className="nosto_page_type" style={{ display: "none" }}>
        cart
      </div>
    </>
  )
}
