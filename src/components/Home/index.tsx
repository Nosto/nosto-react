import React, { FunctionComponent, useEffect } from "react";

const Home: FunctionComponent = () => {
  useEffect(() => {
    // @ts-ignore
    window.nostojs((api) => {
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
  }, []);

  return <div className="nosto_index" style={{ display: "none" }} />;
};

export default Home;
