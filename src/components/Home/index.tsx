import React, { useContext, useEffect } from "react";
import { NostoContext } from "../Provider/context";

const NostoHome: React.FC = () => {

  const contextValue = useContext(NostoContext);

  useEffect(() => {
    // @ts-ignore
    window.nostojs((api) => {
      api
        .defaultSession()
        .setVariation(contextValue.currentVariation.data.shop.paymentSettings.currencyCode)
        .setResponseMode("HTML")
        .viewFrontPage()
        .setPlacements(api.placements.getPlacements())
        .load()
        .then((data: object) => {
          // @ts-ignore
          api.placements.injectCampaigns(data.recommendations);
        });
    });
  }, []);

  return (
    <>
      <div className="nosto_page_type" style={{ display: "none" }}>
        front
      </div>
    </>
  );
};

export default NostoHome;
