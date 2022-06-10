import React, { useEffect } from "react";
import { useNostoContext } from "../Provider/context";

const NostoHome: React.FC = () => {

  const { currentVariationData } = useNostoContext();
  
  useEffect(() => {
    // @ts-ignore
    window.nostojs((api) => {
      api
        .defaultSession()
        .setVariation(currentVariationData.currentVariation)
        .setResponseMode("HTML")
        .viewFrontPage()
        .setPlacements(api.placements.getPlacements())
        .load()
        .then((data: object) => {
          // @ts-ignore
          api.placements.injectCampaigns(data.recommendations);
        });
    });
  }, [currentVariationData.currentVariation]);

  return (
    <>
      <div className="nosto_page_type" style={{ display: "none" }}>
        front
      </div>
    </>
  );
};

export default NostoHome;
