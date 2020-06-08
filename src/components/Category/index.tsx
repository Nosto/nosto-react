import React, { useEffect } from "react";

const Category: React.FC<{ category: string }> = ({ category }) => {

  useEffect(() => {
    window.nostojs(api => {
      api.defaultSession()
        .setResponseMode('HTML')
        .viewCategory(category)
        .setPlacements(api.placements.getPlacements())
        .load()
        .then(data => {
          api.placements.injectCampaigns(data.recommendations);
        });
    });
  }, []);

  return (
    <div className="nosto_category" style={{ display: "none" }}>{category}</div>
  );
};

export default Category;
