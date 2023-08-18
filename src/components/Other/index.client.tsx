import React, { useEffect } from "react";
import { useNostoContext } from "../Provider/context.client";

/**
 * You can personalise your miscellaneous pages by using the NostoOther component.
 * The component does not require any props.
 *
 * By default, your account, when created, has two other-page placements named `other-nosto-1` and `other-nosto-2`.
 * You may omit these and use any identifier you need.
 * The identifiers used here are simply provided to illustrate the example.
 *
 * @example
 * ```
 * <div className="other-page">
 *     <NostoPlacement id="other-nosto-1" />
 *     <NostoPlacement id="other-nosto-2" />
 *     <NostoOther />
 * </div>;
 * ```
 *
 * @group Personalisation Components
 */
export default function NostoOther(props: {
    placements?: string[];
}): JSX.Element {
  const {
    clientScriptLoaded,
    currentVariation,
    responseMode,
    recommendationComponent,
    useRenderCampaigns,
  } = useNostoContext();

  const { renderCampaigns, pageTypeUpdated } = useRenderCampaigns("other");
  
  useEffect(() => {
    if (clientScriptLoaded && pageTypeUpdated) {
      window.nostojs((api) => {
        api
          .defaultSession()
          .setVariation(currentVariation)
          .setResponseMode(responseMode)
          .viewOther()
          .setPlacements(props.placements || api.placements.getPlacements())
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
        other
      </div>
    </>
  );
}
