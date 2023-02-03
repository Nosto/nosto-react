import React, { useEffect } from "react";
import { useNostoContext } from "../Provider/context.client";

const NostoCheckout: React.FC = () => {
  const {
    clientScriptLoaded,
    currentVariation,
    responseMode,
    renderCampaigns,
    recommendationComponent,
  } = useNostoContext();

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
              console.log("render CSR");
              // @ts-ignore
              renderCampaigns(api, data.campaigns);
            }
          });
      });
    }
  }, [clientScriptLoaded, currentVariation, recommendationComponent]);

  return (
    <>
      <div className="nosto_page_type" style={{ display: "none" }}>
        cart
      </div>
    </>
  );
};

export default NostoCheckout;
