import { Purchase } from "../../types"
import { useNostoContext } from "../Provider/context.client"
import { snakeize } from "../../utils/snakeize"
import { useNostoApi } from "../../utils/hooks"

/**
 * You can personalise your order-confirmation/thank-you page by using the `NostoOrder` component.
 * The component requires that you provide it with the details of the order.
 *
 * By default, your account, when created, has one other-page placement named `thankyou-nosto-1`.
 * You may omit this and use any identifier you need. The identifier used here is simply provided to illustrate the example.
 *
 * The order prop requires a value that adheres to the type `Purchase`.
 *
 * @example
 * ```
 * <div className="thankyou-page">
 *     <NostoPlacement id="thankyou-nosto-1" />
 *     <NostoOrder order={{ purchase: toOrder(order) }} />
 * </div>
 * ```
 *
 * @group Personalisation Components
 */
export default function NostoOrder(props: {
  order: { purchase: Purchase }
  placements?: string[]
}): JSX.Element {
  const { order } = props
  const {
    recommendationComponent,
    useRenderCampaigns,
  } = useNostoContext()

  const { renderCampaigns, pageTypeUpdated } = useRenderCampaigns("order")

  useNostoApi(api => {
    api
      .defaultSession()
      .addOrder(snakeize(order))
      .setPlacements(props.placements || api.placements.getPlacements())
      .load()
      .then(data => {
        renderCampaigns(data, api)
      })
  }, [
    recommendationComponent,
    pageTypeUpdated,
  ])

  return (
    <>
      <div className="nosto_page_type" style={{ display: "none" }}>
        order
      </div>
      <div className="nosto_order" style={{ display: "none" }}>
        {order.purchase.number}
      </div>
    </>
  )
}
