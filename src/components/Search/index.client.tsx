import React, { ComponentType, useEffect, useState } from "react";
import { useNostoSearchContext } from "../Provider/context.client";
import { SearchStore } from "../Store/index.client";

const NostoSearch: React.FC<{ query: string, store: SearchStore, Component: ComponentType }> = ({ query, store, Component }) => {
  const { loading } = useNostoSearchContext({store});

  const [state, setState] = useState(store.getState())

  useEffect(() => {
      store.onChange((v) => v, setState)
  }, [store])
  
  useEffect(() => {
    // @ts-ignore
    if (!loading) {
      window.nostojs((api: any) => {
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
    }
  }, [loading, query]);

  return (
    <>
      <div className="nosto_page_type" style={{ display: "none" }}>
        search
      </div>
      <div className="nosto_search" style={{ display: "none" }}>
        {query}
      </div>
      <div className="">
        <Component />
      </div>
    </>
  );
};

export default NostoSearch;
