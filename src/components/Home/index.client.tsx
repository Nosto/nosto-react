import React, { useEffect } from "react";
import { useNostoContext } from "../Provider/context.client";

const NostoHome: React.FC = () => {
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
          .viewFrontPage()
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
        front
      </div>
    </>
  );
};

export default NostoHome;
