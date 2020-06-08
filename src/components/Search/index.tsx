import React, { useEffect } from "react";

const Search: React.FC<{ query: string }> = ({ query }) => {

  useEffect(() => {
    window.nostojs(api => {
      api.defaultSession()
        .setResponseMode('HTML')
        .viewSearch(query)
        .setPlacements(api.placements.getPlacements())
        .load()
        .then(data => {
          api.placements.injectCampaigns(data.recommendations);
        });
    });
  }, []);

  return (
    <div className="nosto_search" style={{ display: "none" }}>{query}</div>
  );
};

export default Search;
