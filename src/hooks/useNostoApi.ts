import { DependencyList, useEffect } from "react"
import { useNostoContext } from "./useNostoContext"
import { useDeepCompareEffect } from "./useDeepCompareEffect"
import { nostojs } from "@nosto/nosto-js"
import { API } from "@nosto/nosto-js/client"

/**
 * Hook for executing code that requires access to the Nosto API.
 * Waits for the client script to load before executing the callback.
 * 
 * @example
 * ```tsx
 * import { useNostoApi } from '@nosto/nosto-react'
 * 
 * function ProductRecommendations({ productId }: { productId: string }) {
 *   useNostoApi(async (api) => {
 *     const data = await api
 *       .defaultSession()
 *       .viewProduct(productId)
 *       .setPlacements(['productpage-nosto-1', 'productpage-nosto-2'])
 *       .load()
 *     
 *     console.log('Recommendations loaded:', data)
 *   }, [productId])
 * 
 *   return <div>Product recommendations will appear here</div>
 * }
 * ```
 * 
 * @example Using deep comparison for complex dependencies
 * ```tsx
 * import { useNostoApi } from '@nosto/nosto-react'
 * 
 * function OrderThankYou({ order }: { order: Order }) {
 *   useNostoApi(async (api) => {
 *     await api
 *       .defaultSession()
 *       .addOrder(order)
 *       .load()
 *   }, [order], { deep: true })
 * 
 *   return <div>Thank you for your order!</div>
 * }
 * ```
 * 
 * @param cb Callback function that receives the Nosto API instance
 * @param deps Optional dependency list for useEffect
 * @param flags Optional flags, including `deep` for deep comparison of dependencies
 * 
 * @group Hooks
 */
export function useNostoApi(cb: (api: API) => void, deps?: DependencyList, flags?: { deep?: boolean }): void {
  const { clientScriptLoaded } = useNostoContext()
  const useEffectFn = flags?.deep ? useDeepCompareEffect : useEffect

  useEffectFn(() => {
    if (clientScriptLoaded) {
      nostojs(cb)
    }
  }, [clientScriptLoaded, ...(deps ?? [])])
}
