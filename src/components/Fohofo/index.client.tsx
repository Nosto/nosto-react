import { useEffect } from "react";
import { useNostoContext } from "../Provider/context.client";

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
 * @group Personalisation Components
 */
export default function Nosto404(): JSX.Element {
  const {
    clientScriptLoaded,
    currentVariation,
    responseMode,
    recommendationComponent,
    useRenderCampaigns,
  } = useNostoContext();

  const { renderCampaigns, pageTypeUpdated } = useRenderCampaigns("404");

  useEffect(() => {
    if (clientScriptLoaded && pageTypeUpdated) {
      window.nostojs((api) => {
        api
          .defaultSession()
          .setVariation(currentVariation)
          .setResponseMode(responseMode)
          .viewNotFound()
          .setPlacements(api.placements.getPlacements())
          .load()
          .then((data) => {
            renderCampaigns(data, api);
          });
      });
    }
  }, [
    clientScriptLoaded,
    currentVariation,
    recommendationComponent,
    pageTypeUpdated,
  ]);

  return (
    <>
      <div className="nosto_page_type" style={{ display: "none" }}>
        notfound
      </div>
    </>
  );
}
