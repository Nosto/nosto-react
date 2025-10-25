import { useNostoApi } from "./useNostoApi"
import { useRenderCampaigns } from "./useRenderCampaigns"

/**
 * @group Hooks
 */
export type NostoHomeProps = { placements?: string[] }

/**
 * You can personalise your home page by using the useNostoHome hook.
 *
 * @example Basic home page usage
 * ```tsx
 * import { useNostoHome } from '@nosto/nosto-react'
 * 
 * function HomePage() {
 *   useNostoHome({
 *     placements: ['frontpage-nosto-1', 'frontpage-nosto-2', 'frontpage-hero']
 *   })
 * 
 *   return (
 *     <div>
 *       <div id="frontpage-hero" />
 *       <h1>Welcome to our store</h1>
 *       <div id="frontpage-nosto-1" />
 *       <div id="frontpage-nosto-2" />
 *     </div>
 *   )
 * }
 * ```
 * 
 * @example Home page with default placements
 * ```tsx
 * import { useNostoHome } from '@nosto/nosto-react'
 * 
 * function SimpleHomePage() {
 *   // Uses all available placements configured in Nosto admin
 *   useNostoHome()
 * 
 *   return (
 *     <div>
 *       <h1>Home Page</h1>
 *       {/\* Nosto will inject content into configured placements *\/}
 *     </div>
 *   )
 * }
 * ```
 *
 * @group Hooks
 */
export function useNostoHome(props?: NostoHomeProps) {
  const { renderCampaigns } = useRenderCampaigns()

  useNostoApi(async api => {
    const data = await api
      .defaultSession()
      .viewFrontPage()
      .setPlacements(props?.placements || api.placements.getPlacements())
      .load()
    renderCampaigns(data)
  })
}