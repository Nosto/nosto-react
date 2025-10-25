import { useNostoApi } from "./useNostoApi"
import { useRenderCampaigns } from "./useRenderCampaigns"

/**
 * @group Hooks
 */
export type Nosto404Props = { placements?: string[] }

/**
 * You can personalise your 404 error pages by using the `useNosto404` hook.
 *
 * @example Basic 404 page usage
 * ```tsx
 * import { useNosto404 } from '@nosto/nosto-react'
 * 
 * function NotFoundPage() {
 *   useNosto404({
 *     placements: ['notfound-nosto-1', 'notfound-popular-products']
 *   })
 * 
 *   return (
 *     <div>
 *       <h1>Page Not Found</h1>
 *       <p>Sorry, the page you're looking for doesn't exist.</p>
 *       <div id="notfound-popular-products" />
 *       <div id="notfound-nosto-1" />
 *     </div>
 *   )
 * }
 * ```
 * 
 * @example 404 page with default placements
 * ```tsx
 * import { useNosto404 } from '@nosto/nosto-react'
 * 
 * function Simple404Page() {
 *   useNosto404() // Uses all available placements
 * 
 *   return (
 *     <div>
 *       <h1>Oops! Page not found</h1>
 *       <p>Let us help you find what you're looking for:</p>
 *     </div>
 *   )
 * }
 * ```
 *
 * @group Hooks
 */
export function useNosto404(props?: Nosto404Props) {
  const { renderCampaigns } = useRenderCampaigns()

  useNostoApi(async api => {
    const data = await api
      .defaultSession()
      .viewNotFound()
      .setPlacements(props?.placements || api.placements.getPlacements())
      .load()
    renderCampaigns(data)
  })
}
