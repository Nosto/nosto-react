import { snakeize } from "../utils/snakeize"
import { PushedCustomer as CustomerSnakeCase, Cart as CartSnakeCase } from "@nosto/nosto-js/client"
import { ToCamelCase } from "../utils/types"
import { useNostoContext } from "./useNostoContext"
import { useDeepCompareEffect } from "./useDeepCompareEffect"
import { nostojs } from "@nosto/nosto-js"

/**
 * @group Hooks
 */
export type NostoSessionProps = {
  cart?: CartSnakeCase | ToCamelCase<CartSnakeCase>
  customer?: CustomerSnakeCase | ToCamelCase<CustomerSnakeCase>
}

/**
 * Nosto React requires that you pass it the details of current cart contents and the details of the currently logged-in customer, if any, on every route change.
 *
 * @example Basic session management
 * ```tsx
 * import { useNostoSession } from '@nosto/nosto-react'
 * 
 * function App({ cart, user }: { cart?: Cart, user?: Customer }) {
 *   useNostoSession({
 *     cart: cart ? {
 *       items: cart.items.map(item => ({
 *         product_id: item.productId,
 *         sku_id: item.skuId,
 *         name: item.name,
 *         unit_price: item.price,
 *         quantity: item.quantity
 *       }))
 *     } : undefined,
 *     customer: user ? {
 *       customer_reference: user.id,
 *       email: user.email,
 *       first_name: user.firstName,
 *       last_name: user.lastName
 *     } : undefined
 *   })
 * 
 *   return <div>App content</div>
 * }
 * ```
 * 
 * @example Route-based session updates
 * ```tsx
 * import { useNostoSession } from '@nosto/nosto-react'
 * import { useEffect, useState } from 'react'
 * 
 * function SessionProvider({ children }: { children: React.ReactNode }) {
 *   const [cart, setCart] = useState<Cart | null>(null)
 *   const [customer, setCustomer] = useState<Customer | null>(null)
 * 
 *   useEffect(() => {
 *     // Load cart and customer data
 *     loadCartData().then(setCart)
 *     loadCustomerData().then(setCustomer)
 *   }, [])
 * 
 *   useNostoSession({
 *     cart: cart ? {
 *       items: cart.items
 *     } : undefined,
 *     customer: customer ? {
 *       customerReference: customer.id,
 *       email: customer.email
 *     } : undefined
 *   })
 * 
 *   return <>{children}</>
 * }
 * ```
 *
 * @group Hooks
 */
export function useNostoSession({ cart, customer }: NostoSessionProps = {}) {
  const { clientScriptLoaded } = useNostoContext()

  useDeepCompareEffect(() => {
    const currentCart = cart ? snakeize(cart) : undefined
    const currentCustomer = customer ? snakeize(customer) : undefined

    if (clientScriptLoaded) {
      nostojs(api => {
        api.defaultSession().setCart(currentCart).setCustomer(currentCustomer).viewOther().load({ skipPageViews: true })
      })
    }
  }, [clientScriptLoaded, cart, customer])
}
