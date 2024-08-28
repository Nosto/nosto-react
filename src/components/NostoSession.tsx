import { useNostoContext, useDeepCompareEffect } from "../hooks"
import { Cart, Customer } from "../types"
import { snakeize } from "../utils/snakeize"

/**
 * @group Components
 */
export type NostoSessionProps = {
  cart?: Cart
  customer?: Customer
}

/**
 * Nosto React requires that you pass it the details of current cart contents and the details of the currently logged-in customer, if any, on every route change.
 * This makes it easier to add attribution.
 *
 * The `NostoSession` component makes it very easy to keep the session up to date so long as the cart and the customer are provided.
 *
 * The cart prop requires a value that adheres to the type `Cart`, while the customer prop requires a value that adheres to the type `Customer`.
 *
 * @group Components
 */
export default function NostoSession(props?: NostoSessionProps) {
  useNostoSession(props)
  return null
}

/**
 * Nosto React requires that you pass it the details of current cart contents and the details of the currently logged-in customer, if any, on every route change.
 * 
 * @group Hooks
 */
export function useNostoSession({ cart, customer }: NostoSessionProps = {}) {
  const { clientScriptLoaded } = useNostoContext()

  useDeepCompareEffect(() => {
    const currentCart = cart ? snakeize(cart) : undefined
    const currentCustomer = customer ? snakeize(customer) : undefined

    if (clientScriptLoaded) {
      window.nostojs(api => {
        api
          .defaultSession()
          .setResponseMode("HTML")
          .setCart(currentCart)
          .setCustomer(currentCustomer)
          .viewOther()
          .load({ skipPageViews: true })
      })
    }
  }, [clientScriptLoaded, cart, customer])

}
