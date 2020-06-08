import React, { FunctionComponent, useEffect } from "react";

const Category: FunctionComponent<{ category: string }> = ({ category }) => {
  useEffect(() => {
    // @ts-ignore
    window.nostojs((api) => {
      api
        .defaultSession()
        .setResponseMode("HTML")
        .viewCategory(category)
        .setPlacements(api.placements.getPlacements())
        .load()
        .then((data: object) => {
          // @ts-ignore
          api.placements.injectCampaigns(data.recommendations);
        });
    });
  }, []);

  return (
    <div className="nosto_category" style={{ display: "none" }}>
      {category}
    </div>
  );
};

export default Category;
