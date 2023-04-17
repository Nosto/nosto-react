import React, { useEffect } from "react";
import { useNostoContext } from "../Provider/context.client";

/**
 * Home component can be used to personalize (e.g. render campaigns) in front page. The component does not require any props.
 * The `<NostoHome \>` component needs to be added after the placements. Content and recommendations will be rendered through this component.
 *  * @example
 * ```
 <div className="front-page">
  ...
  ...
  ...
  <NostoPlacement id="frontpage-nosto-1" />
  <NostoPlacement id="frontpage-nosto-2" />
  <NostoPlacement id="frontpage-nosto-3" />
  <NostoPlacement id="frontpage-nosto-4" />
  <NostoHome />
</div>
 * ```
 */

export const NostoHome: React.FC = () => {
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
          .viewFrontPage()
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
    recommendationComponent,
    pageTypeUpdated,
  ]);

  return (
    <>
      <div className="nosto_page_type" style={{ display: "none" }}>
        front
      </div>
    </>
  );
};

export default NostoHome;
