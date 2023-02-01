import React, { useEffect } from "react";
import { useNostoContext } from "../Provider/context.client";

const NostoCheckout: React.FC = () => {
  const { clientScriptLoaded, currentVariation, renderFunction } =
    useNostoContext();

  const responseMode =
    renderFunction && typeof renderFunction == "function"
      ? "JSON_ORIGINAL"
      : "HTML";

  useEffect(() => {
    // @ts-ignore
    if (clientScriptLoaded) {
      window.nostojs((api: any) => {
        api
          .defaultSession()
          .setVariation(currentVariation)
          .setResponseMode(responseMode)
          .viewCart()
          .setPlacements(api.placements.getPlacements())
          .load()
          .then((data: object) => {
            if (responseMode == "HTML") {
              // @ts-ignore
              api.placements.injectCampaigns(data.recommendations);
            } else {
              // @ts-ignore
              renderFunction(data.campaigns);
            }
          });
      });
    }
  }, [clientScriptLoaded, currentVariation, renderFunction]);

  return (
    <>
      <div className="nosto_page_type" style={{ display: "none" }}>
        cart
      </div>
    </>
  );
};

export default NostoCheckout;
