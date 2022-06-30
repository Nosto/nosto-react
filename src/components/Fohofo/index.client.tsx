import React, { useEffect } from "react";
import { useNostoContext } from "../Provider/context.client";

const NostoFohofo: React.FC = () => {
  const { clientScriptLoaded, currentVariation } = useNostoContext();
  useEffect(() => {
    // @ts-ignore
    if (clientScriptLoaded) {
      window.nostojs((api: any) => {
        api
          .defaultSession()
          .setVariation(currentVariation)
          .setResponseMode("HTML")
          .viewNotFound()
          .setPlacements(api.placements.getPlacements())
          .load()
          .then((data: object) => {
            // @ts-ignore
            api.placements.injectCampaigns(data.recommendations);
          });
      });
    }
  }, [clientScriptLoaded, currentVariation]);

  return (
    <>
      <div className="nosto_page_type" style={{ display: "none" }}>
        notfound
      </div>
    </>
  );
};

export default NostoFohofo;
