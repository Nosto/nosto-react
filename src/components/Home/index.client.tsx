import React, { useEffect } from "react";
import { useNostoContext } from "../Provider/context.client";

const NostoHome: React.FC = () => {
  const {
    clientScriptLoaded,
    currentVariation,
    responseMode,
    renderCampaigns,
    recommendationComponent,
  } = useNostoContext();

  console.log("home render", responseMode);

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
        front
      </div>
    </>
  );
};

export default NostoHome;
