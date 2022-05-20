import React, { useEffect } from "react";
import snakeize from "snakeize";

function Order({ order }) {
  useEffect(() => {
    window.nostojs((api) => {
      api
        .defaultSession()
        .setResponseMode("HTML")
        .addOrder(snakeize(order))
        .setPlacements(api.placements.getPlacements())
        .load()
        .then((data) => {
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
}

export default Order;
