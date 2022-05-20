import React, { useEffect } from "react";

function Category({ category }) {
  useEffect(() => {
    window.nostojs((api) => {
      api
        .defaultSession()
        .setResponseMode("HTML")
        .viewCategory(category)
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
        category
      </div>
      <div className="nosto_category" style={{ display: "none" }}>
        {category}
      </div>
    </>
  );
}

export default Category;
