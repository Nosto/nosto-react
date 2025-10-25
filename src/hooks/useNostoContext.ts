import { useContext } from "react"
import { NostoContext, NostoContextType } from "../context"

/**
 * A hook that allows you to access the NostoContext and retrieve Nosto-related data from it in React components.
 *
 * @example
 * ```tsx
 * import { useNostoContext } from '@nosto/nosto-react'
 * 
 * function NostoStatus() {
 *   const { clientScriptLoaded, account, responseMode } = useNostoContext()
 * 
 *   return (
 *     <div>
 *       <p>Account: {account}</p>
 *       <p>Script loaded: {String(clientScriptLoaded)}</p>
 *       <p>Response mode: {responseMode}</p>
 *     </div>
 *   )
 * }
 * ```
 * 
 * @example Using context for conditional rendering
 * ```tsx
 * import { useNostoContext } from '@nosto/nosto-react'
 * 
 * function ConditionalRecommendations() {
 *   const { clientScriptLoaded, recommendationComponent } = useNostoContext()
 * 
 *   if (!clientScriptLoaded) {
 *     return <div>Loading recommendations...</div>
 *   }
 * 
 *   return (
 *     <div>
 *       {recommendationComponent && (
 *         <div id="nosto-recommendation-placeholder" />
 *       )}
 *     </div>
 *   )
 * }
 * ```
 *
 * @group Essential Functions
 */
export function useNostoContext(): NostoContextType {
  return useContext(NostoContext)
}
