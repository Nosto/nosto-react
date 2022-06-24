import React, { useEffect } from "react";
import { useNostoContext } from "../Provider/context.client";

const NostoHome: React.FC = () => {
  const { clientScriptLoaded } = useNostoContext();
  console.log("Render Home", clientScriptLoaded);
  useEffect(() => {
    // @ts-ignore
    console.log("useEffect Home");
    if (clientScriptLoaded) {
      window.nostojs((api: any) => {
        api
          .defaultSession()
          .setResponseMode("HTML")
          .viewFrontPage()
          .setPlacements(api.placements.getPlacements())
          .load()
          .then((data: object) => {
            // @ts-ignore
            api.placements.injectCampaigns(data.recommendations);
          });
      });
    }
  }, [clientScriptLoaded]);

  return (
    <>
      <div className="nosto_page_type" style={{ display: "none" }}>
        front
      </div>
    </>
  );
};

export default NostoHome;
