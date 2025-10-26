import { useNostoApi } from "./useNostoApi"
import { useRenderCampaigns } from "./useRenderCampaigns"

/**
 * @group Hooks
 */
export type NostoOtherProps = { placements?: string[] }

/**
 * You can personalise your miscellaneous pages by using the useNostoOther hook.
 *
 * @example Basic usage for contact page
 * ```tsx
 * import { useNostoOther } from '@nosto/nosto-react'
 * 
 * function ContactPage() {
 *   useNostoOther({
 *     placements: ['contactpage-nosto-1', 'contactpage-popular-products']
 *   })
 * 
 *   return (
 *     <div>
 *       <h1>Contact Us</h1>
 *       <form>
 *         {/\* Contact form fields *\/}
 *       </form>
 *       <div id="contactpage-popular-products" />
 *       <div id="contactpage-nosto-1" />
 *     </div>
 *   )
 * }
 * ```
 * 
 * @example About page with recommendations
 * ```tsx
 * import { useNostoOther } from '@nosto/nosto-react'
 * 
 * function AboutPage() {
 *   useNostoOther({
 *     placements: ['aboutpage-featured', 'aboutpage-bestsellers']
 *   })
 * 
 *   return (
 *     <div>
 *       <h1>About Our Company</h1>
 *       <p>Learn more about our story...</p>
 *       <div id="aboutpage-featured" />
 *       <div id="aboutpage-bestsellers" />
 *     </div>
 *   )
 * }
 * ```
 * 
 * @example Default placements for any other page
 * ```tsx
 * import { useNostoOther } from '@nosto/nosto-react'
 * 
 * function GenericPage() {
 *   useNostoOther() // Uses all available placements
 * 
 *   return (
 *     <div>
 *       <h1>Generic Page</h1>
 *       <p>This could be any page type not covered by other hooks.</p>
 *     </div>
 *   )
 * }
 * ```
 *
 * @group Hooks
 */
export function useNostoOther(props?: NostoOtherProps) {
  const { renderCampaigns } = useRenderCampaigns()

  useNostoApi(async api => {
    const data = await api
      .defaultSession()
      .viewOther()
      .setPlacements(props?.placements || api.placements.getPlacements())
      .load()
    renderCampaigns(data)
  })
}
