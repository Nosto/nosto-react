import React from "react";
import snakeize from "snakeize";

import useDeepCompareEffect from "use-deep-compare-effect";

function Session({ cart, customer }) {
  useDeepCompareEffect(() => {
    const currentUser = customer ? customer : undefined;
    console.debug(currentUser);
    const currentCart = cart ? cart : undefined;
    console.debug(currentCart);

    window.nostojs((api) => {
      api
        .defaultSession()
        .setResponseMode("HTML")
        .setCart(snakeize(currentCart))
        .viewOther()
        .load();
    });
  }, [cart || [], customer || {}]);

  return <div />;
}

export default Session;
