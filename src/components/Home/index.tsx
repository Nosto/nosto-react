import React, { useEffect } from "react";

const Home: React.FC = () => {

  useEffect(() => {
    window.nostojs(api => {
      api.defaultSession()
        .setResponseMode('HTML')
        .viewFrontPage()
        .setPlacements(api.placements.getPlacements())
        .load()
        .then(data => {
          api.placements.injectCampaigns(data.recommendations);
        });
    });
  }, []);

  return (
    <div className="nosto_index" style={{ display: "none" }}/>
  );
};

export default Home;
