import { Purchase } from "../../types";
import React, { useEffect } from "react";
import snakeize from "snakeize";

export interface OrderProps {
  purchase: Purchase;
}

const Order: React.FC<{ order: OrderProps }> = ({ order }) => {
  useEffect(() => {
    // @ts-ignore
    window.nostojs((api) => {
      api
        .defaultSession()
        .setResponseMode("HTML")
        .addOrder(snakeize(order))
        .setPlacements(api.placements.getPlacements())
        .load()
        .then((data: object) => {
          // @ts-ignore
          api.placements.injectCampaigns(data.recommendations);
        });
    });
  }, []);

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

export default Order;
