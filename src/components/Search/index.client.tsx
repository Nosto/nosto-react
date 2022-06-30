import React, { useEffect } from "react";
import { useNostoContext } from "../Provider/context.client";

const NostoSearch: React.FC<{ query: string }> = ({ query }) => {
  const { clientScriptLoaded, currentVariation } = useNostoContext();
  useEffect(() => {
    // @ts-ignore
    if (clientScriptLoaded) {
      window.nostojs((api: any) => {
        api
          .defaultSession()
          .setVariation(currentVariation)
          .setResponseMode("HTML")
          .viewSearch(query)
          .setPlacements(api.placements.getPlacements())
          .load()
          .then((data: object) => {
            // @ts-ignore
            api.placements.injectCampaigns(data.recommendations);
          });
      });
    }
  }, [clientScriptLoaded, currentVariation, query]);

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
