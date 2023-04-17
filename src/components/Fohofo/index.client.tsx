import React, { useEffect } from "react";
import { useNostoContext } from "../Provider/context.client";
/**
 * Component can be used to personalise not found pages. The component does not require any props.
 * The `<Nosto404 \>` component needs to be added after the placements. Content and recommendations will be rendered through this component.
 * @example
 * ```
<div className="notfound-page">
  ...
  ...
  ...
  <NostoPlacement id="notfound-nosto-1" />
  <NostoPlacement id="notfound-nosto-2" />
  <NostoPlacement id="notfound-nosto-3" />
  <Nosto404 />
</div>
 * ```
 */
const NostoFohofo: React.FC = () => {
  const {
    clientScriptLoaded,
    currentVariation,
    responseMode,
    recommendationComponent,
    useRenderCampaigns,
  } = useNostoContext();

  const { renderCampaigns, pageTypeUpdated } = useRenderCampaigns("404");

  useEffect(() => {
    if (clientScriptLoaded && pageTypeUpdated) {
      window.nostojs((api) => {
        api
          .defaultSession()
          .setVariation(currentVariation)
          .setResponseMode(responseMode)
          .viewNotFound()
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
        notfound
      </div>
    </>
  );
};

export default NostoFohofo;
