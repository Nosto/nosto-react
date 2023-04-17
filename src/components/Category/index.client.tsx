import React, { useEffect } from "react";
import { useNostoContext } from "../Provider/context.client";

/**
 * @param category a string passed to search params
 * */
/**
 *Category component takes a single prop called category, which is a string representing the current category.
 * @example
 * ```
 <div className="category-page">
  ... ... ...
  <NostoPlacement id="categorypage-nosto-1" />
  <NostoPlacement id="categorypage-nosto-2" />
  <NostoCategory category={category.name} />
</div>;
 * ```
 */
const NostoCategory: React.FC<{ category: string }> = ({ category }) => {
  const {
    clientScriptLoaded,
    currentVariation,
    responseMode,
    recommendationComponent,
    useRenderCampaigns,
  } = useNostoContext();

  const { renderCampaigns, pageTypeUpdated } = useRenderCampaigns("home");

  useEffect(() => {
    if (clientScriptLoaded && pageTypeUpdated) {
      window.nostojs((api) => {
        api
          .defaultSession()
          .setVariation(currentVariation)
          .setResponseMode(responseMode)
          .viewCategory(category)
          .setPlacements(api.placements.getPlacements())
          .load()
          .then((data) => {
            renderCampaigns(data, api);
          });
      });
    }
  }, [
    clientScriptLoaded,
    category,
    currentVariation,
    recommendationComponent,
    pageTypeUpdated,
  ]);

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
};

export default NostoCategory;
