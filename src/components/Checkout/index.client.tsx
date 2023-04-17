import React, { useEffect } from "react";
import { useNostoContext } from "../Provider/context.client";

/**
 * Checkout component can be used to personalise cart and checkout pages by using the `Nosto404` component. The component does not require any props.
 * The `<Nosto404 \>` component needs to be added after the placements. Content and recommendations will be rendered through this component.
 *  * @example
 * ```
<div className="checkout-page">
  ...
  ...
  ...
  <NostoPlacement id="checkout-nosto-1" />
  <NostoPlacement id="checkout-nosto-2" />
  <NostoCheckout />
</div>
 * ```
 */

const NostoCheckout: React.FC = () => {
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
        cart
      </div>
    </>
  );
};

export default NostoCheckout;
