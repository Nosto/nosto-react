import React, { useEffect } from "react";

const Other: React.FC = () => {
  useEffect(() => {
    // @ts-ignore
    window.nostojs((api) => {
      api
        .defaultSession()
        .setResponseMode("HTML")
        .viewOther()
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
        other
      </div>
    </>
  );
};

export default Other;
