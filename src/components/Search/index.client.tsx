import React, { useEffect } from "react";
import { useNostoContext } from "../Provider/context.client";

const NostoSearch: React.FC<{ query: string }> = ({ query }) => {
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
          .viewSearch(query)
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
  }, [clientScriptLoaded, currentVariation, query, recommendationComponent]);

  return (
    <>
      <div className="nosto_page_type" style={{ display: "none" }}>
        search
      </div>
      <div className="nosto_search" style={{ display: "none" }}>
        {query}
      </div>
    </>
  );
};

export default NostoSearch;
