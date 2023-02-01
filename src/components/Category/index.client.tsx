import React, { useEffect } from "react";
import { useNostoContext } from "../Provider/context.client";

const NostoCategory: React.FC<{ category: string }> = ({ category }) => {
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
          .viewCategory(category)
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
  }, [clientScriptLoaded, category, currentVariation, renderFunction]);

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
