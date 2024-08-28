import { useNostoApi, useRenderCampaigns } from "../hooks"

/**
 * You can personalise your cart and checkout pages by using the `Nosto404` component.
 * The component does not require any props.
 *
 * By default, your account, when created, has three 404-page placements named `notfound-nosto-1`, `notfound-nosto-2` and `notfound-nosto-3`.
 * You may omit these and use any identifier you need.
 * The identifiers used here are simply provided to illustrate the example.
 *
 * @example
 * ```
 * <div className="notfound-page">
 *   <NostoPlacement id="notfound-nosto-1" />
 *   <NostoPlacement id="notfound-nosto-2" />
 *   <NostoPlacement id="notfound-nosto-3" />
 *   <Nosto404 />
 * </div>
 * ```
 *
 * @group Components
 */
export default function Nosto404(props: { placements?: string[] }) {
  useNosto404(props)
  return null
}

/**
 * You can personalise your cart and checkout pages by using the `useNosto404` hook.
 * 
 * @group Hooks
 */
export function useNosto404(props: { placements?: string[] }) {
  const { renderCampaigns } = useRenderCampaigns()

  useNostoApi(
    async (api) => {
      const data = await api.defaultSession()
        .viewNotFound()
        .setPlacements(props.placements || api.placements.getPlacements())
        .load()
      renderCampaigns(data)
    })
}
