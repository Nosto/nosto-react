import { useRenderCampaigns, useNostoApi } from "../hooks"

/**
 * The `NostoHome` component must be used to personalise the home page. The component does not require any props.
 *
 * By default, your account, when created, has four front-page placements named `frontpage-nosto-1`, `frontpage-nosto-2`, `frontpage-nosto-3` and `frontpage-nosto-4`.
 * You may omit these and use any identifier you need.
 * The identifiers used here are simply provided to illustrate the example.
 *
 * The `<NostoHome \>` component needs to be added after the placements.
 * Content and recommendations will be rendered through this component.
 *
 * @example
 * ```
 *  <div className="front-page">
 *   <NostoPlacement id="frontpage-nosto-1" />
 *   <NostoPlacement id="frontpage-nosto-2" />
 *   <NostoPlacement id="frontpage-nosto-3" />
 *   <NostoPlacement id="frontpage-nosto-4" />
 *   <NostoHome />
 * </div>
 * ```
 *
 * @group Components
 */
export default function NostoHome(props: { placements?: string[] }) {
  useNostoHome(props)
  return null
}

/**
 * You can personalise your home page by using the useNostoHome hook.
 * 
 * @group Hooks
 */
export function useNostoHome(props?: { placements?: string[] }) {
  const { renderCampaigns } = useRenderCampaigns()

  useNostoApi(
    async (api) => {
      const data = await api.defaultSession()
        .viewFrontPage()
        .setPlacements(props?.placements || api.placements.getPlacements())
        .load()
      renderCampaigns(data)
    }
  )
}
