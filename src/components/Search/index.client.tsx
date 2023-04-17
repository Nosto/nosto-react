import React, { useEffect } from "react";
import { useNostoContext } from "../Provider/context.client";

/**
 * * @param query a string passed to search params
 * */
/**
 *Search component takes a single prop called query, which is a string representing the search query entered by the user.
 * @example
 * ```
 * <NostoSearch query={searchTerm ? decodeURI(searchTerm) : ''} />
 * ```
 */
const NostoSearch: React.FC<{ query: string }> = ({ query }) => {
  const {
    clientScriptLoaded,
    currentVariation,
    responseMode,
    recommendationComponent,
    useRenderCampaigns,
  } = useNostoContext();

  const { renderCampaigns, pageTypeUpdated } = useRenderCampaigns("search");

  useEffect(() => {
    if (clientScriptLoaded && pageTypeUpdated) {
      window.nostojs((api) => {
        api
          .defaultSession()
          .setVariation(currentVariation)
          .setResponseMode(responseMode)
          .viewSearch(query)
          .setPlacements(api.placements.getPlacements())
          .load()
          .then((data) => {
            renderCampaigns(data, api);
          });
      });
    }
  }, [
    clientScriptLoaded,
    currentVariation,
    query,
    recommendationComponent,
    pageTypeUpdated,
  ]);

  return (
    <>
      <div className="nosto_page_type" style={{ display: "none" }}>
        search
      </div>
      <div className="nosto_search" style={{ display: "none" }}>
        {query}
      </div>
    </>
  );
};

export default NostoSearch;
