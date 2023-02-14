import React, { useEffect } from "react";
import { useNostoContext } from "../Provider/context.client";

const NostoFohofo: React.FC = () => {
  const {
    clientScriptLoaded,
    currentVariation,
    responseMode,
    recommendationComponent,
    useRenderCampaigns,
  } = useNostoContext();

  const { renderCampaigns, pageTypeUpdated } = useRenderCampaigns("404");

  useEffect(() => {
    // @ts-ignore
    if (clientScriptLoaded && pageTypeUpdated) {
      window.nostojs((api: any) => {
        api
          .defaultSession()
          .setVariation(currentVariation)
          .setResponseMode(responseMode)
          .viewNotFound()
          .setPlacements(api.placements.getPlacements())
          .load()
          .then((data: object) => {
            renderCampaigns(data, api);
          });
      });
    }
  }, [
    clientScriptLoaded,
    currentVariation,
    recommendationComponent,
    pageTypeUpdated,
  ]);

  return (
    <>
      <div className="nosto_page_type" style={{ display: "none" }}>
        notfound
      </div>
    </>
  );
};

export default NostoFohofo;
