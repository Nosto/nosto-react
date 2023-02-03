import React, { useEffect } from "react";
import { useNostoContext } from "../Provider/context.client";

const NostoCategory: React.FC<{ category: string }> = ({ category }) => {
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
          .viewCategory(category)
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
  }, [clientScriptLoaded, category, currentVariation, recommendationComponent]);

  return (
    <>
      <div className="nosto_page_type" style={{ display: "none" }}>
        category
      </div>
      <div className="nosto_category" style={{ display: "none" }}>
        {category}
      </div>
    </>
  );
};

export default NostoCategory;
