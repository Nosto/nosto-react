import React, { useEffect } from "react";

function Other() {
  useEffect(() => {
    window.nostojs((api) => {
      api
        .defaultSession()
        .setResponseMode("HTML")
        .viewOther()
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
        other
      </div>
    </>
  );
}

export default Other;
