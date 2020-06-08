import React, { FunctionComponent, useEffect } from "react";

const Search: FunctionComponent<{ query: string }> = ({ query }) => {
  useEffect(() => {
    // @ts-ignore
    window.nostojs((api) => {
      api
        .defaultSession()
        .setResponseMode("HTML")
        .viewSearch(query)
        .setPlacements(api.placements.getPlacements())
        .load()
        .then((data: object) => {
          // @ts-ignore
          api.placements.injectCampaigns(data.recommendations);
        });
    });
  }, []);

  return (
    <div className="nosto_search" style={{ display: "none" }}>
      {query}
    </div>
  );
};

export default Search;
