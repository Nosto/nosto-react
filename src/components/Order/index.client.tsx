import { Purchase } from "../../types";
import React, { useEffect } from "react";
import { useNostoContext } from "../Provider/context.client";
import { snakeize } from "../../utils/snakeize";

export interface OrderProps {
  purchase: Purchase;
}

const NostoOrder: React.FC<{ order: OrderProps }> = ({ order }) => {
  const {
    clientScriptLoaded,
    currentVariation,
    responseMode,
    recommendationComponent,
    useRenderCampaigns,
  } = useNostoContext();

  const { renderCampaigns, pageTypeUpdated } = useRenderCampaigns("order");

  useEffect(() => {
    if (clientScriptLoaded && pageTypeUpdated) {
      window.nostojs((api) => {
        api
          .defaultSession()
          .setVariation(currentVariation)
          .setResponseMode(responseMode)
          .addOrder(snakeize(order))
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
        order
      </div>
      <div className="nosto_order" style={{ display: "none" }}>
        {order.purchase.number}
      </div>
    </>
  );
};

export default NostoOrder;
