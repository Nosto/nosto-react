import React, { useEffect } from "react";

const Fohofo: React.FC = () => {
  useEffect(() => {
    // @ts-ignore
    window.nostojs((api) => {
      api
        .defaultSession()
        .setResponseMode("HTML")
        .viewNotFound()
        .setPlacements(api.placements.getPlacements())
        .load()
        .then((data: object) => {
          // @ts-ignore
          api.placements.injectCampaigns(data.recommendations);
        });
    });
  }, []);

  return (
    <div className="nosto_notfound" style={{ display: "none" }} />
  );
};

export default Fohofo;
