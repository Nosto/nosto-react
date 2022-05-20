import React, { useEffect } from "react";

function Checkout() {
  useEffect(() => {
    window.nostojs((api) => {
      api
        .defaultSession()
        .setResponseMode("HTML")
        .viewCart()
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
        cart
      </div>
    </>
  );
}

export default Checkout;
