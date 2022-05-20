import React, { useEffect } from "react";

function Fohofo() {
  useEffect(() => {
    window.nostojs((api) => {
      api
        .defaultSession()
        .setResponseMode("HTML")
        .viewNotFound()
        .setPlacements(api.placements.getPlacements())
        .load()
        .then((data) => {
          api.placements.injectCampaigns(data.recommendations);
        });
    });
  }, []);

  return (
    <>
      <div className="nosto_page_type" style={{ display: "none" }}>
        notfound
      </div>
    </>
  );
}

export default Fohofo;
