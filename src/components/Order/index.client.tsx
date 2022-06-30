import { Purchase } from "../../types";
import React, { useEffect } from "react";
import snakeize from "snakeize";
import { useNostoContext } from "../Provider/context.client";

export interface OrderProps {
  purchase: Purchase;
}

const NostoOrder: React.FC<{ order: OrderProps }> = ({ order }) => {
  const { clientScriptLoaded, currentVariation } = useNostoContext();
  useEffect(() => {
    // @ts-ignore
    if (clientScriptLoaded) {
      window.nostojs((api: any) => {
        api
          .defaultSession()
          .setVariation(currentVariation)
          .setResponseMode("HTML")
          .addOrder(snakeize(order))
          .setPlacements(api.placements.getPlacements())
          .load()
          .then((data: object) => {
            // @ts-ignore
            api.placements.injectCampaigns(data.recommendations);
          });
      });
    }
  }, [clientScriptLoaded, currentVariation]);

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
