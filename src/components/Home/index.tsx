import React, { useEffect } from "react";
import { useNostoContext } from "../Provider/context.client";

const NostoHome: React.FC = () => {
  console.log("HOME RENDERED 2");
  const { clientScriptLoaded } = useNostoContext();
  console.log(clientScriptLoaded);
  useEffect(() => {
    // @ts-ignore
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
