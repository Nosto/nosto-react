import React, { useEffect } from "react";

interface NostoTaggingProps {
  currentVariation: string;
}

const NostoHome: React.FC<NostoTaggingProps> = ({
  currentVariation
}) => {
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

  return (
    <>
      <div className="nosto_page_type" style={{ display: "none" }}>
        front
      </div>
      { currentVariation && <div className="nosto_variation" style={{ display: "none" }}>{currentVariation}</div> }
    </>
  );
};

export default NostoHome;
