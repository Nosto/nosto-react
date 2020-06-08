import { Purchase } from "../../types";
import React, { useEffect } from "react";
import snakeize from "snakeize";

export interface OrderProps {
  purchase: Purchase
}

const Order: React.FC<{ order: OrderProps }> = ({ order }) => {

  useEffect(() => {
    window.nostojs(api => {
      api.defaultSession()
        .setResponseMode('HTML')
        .addOrder(snakeize(order))
        .setPlacements(api.placements.getPlacements())
        .load()
        .then(data => {
          api.placements.injectCampaigns(data.recommendations);
        });
    });
  }, []);

  return (
    <div className="nosto_order" style={{ display: "none" }}>{order.purchase.number}</div>
  );
};

export default Order;
