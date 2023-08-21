import { useEffect } from "react";
import { useNostoContext } from "../Provider/context.client";

/**
 * You can personalise your cart and checkout pages by using the NostoCheckout component.
 * The component does not require any props.
 *
 * By default, your account, when created, has two cart-page placements named `categorypage-nosto-1` and `categorypage-nosto-2`.
 * You may omit these and use any identifier you need.
 * The identifiers used here are simply provided to illustrate the example.
 *
 * @example
 * ```
 * <div className="checkout-page">
 *   <NostoPlacement id="checkout-nosto-1" />
 *   <NostoPlacement id="checkout-nosto-2" />
 *   <NostoCheckout />
 * </div>
 * ```
 *
 * @group Personalisation Components
 */

export default function NostoCheckout(props: {
  placements?: string[];
}): JSX.Element {
  const {
    clientScriptLoaded,
    currentVariation,
    responseMode,
    recommendationComponent,
    useRenderCampaigns,
  } = useNostoContext();

  const { renderCampaigns, pageTypeUpdated } = useRenderCampaigns("checkout");

  useEffect(() => {
    if (clientScriptLoaded && pageTypeUpdated) {
      window.nostojs((api) => {
        api
          .defaultSession()
          .setVariation(currentVariation)
          .setResponseMode(responseMode)
          .viewCart()
          .setPlacements(props.placements || api.placements.getPlacements())
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
        cart
      </div>
    </>
  );
}
