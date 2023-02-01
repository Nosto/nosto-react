import React, { useEffect } from "react";
import { useNostoContext } from "../Provider/context.client";

const NostoFohofo: React.FC = () => {
  const { clientScriptLoaded, currentVariation, renderFunction, responseMode } =
    useNostoContext();

  useEffect(() => {
    // @ts-ignore
    if (clientScriptLoaded) {
      window.nostojs((api: any) => {
        api
          .defaultSession()
          .setVariation(currentVariation)
          .setResponseMode(responseMode)
          .viewNotFound()
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
        notfound
      </div>
    </>
  );
};

export default NostoFohofo;
