import React from "react";
import snakeize from "snakeize";

import useDeepCompareEffect from "use-deep-compare-effect";
import { Cart, Customer } from "../../types";

interface NostoSessionProps {
  cart: Cart;
  customer: Customer;
}

const NostoSession: React.FC<NostoSessionProps> = ({ cart, customer }) => {
  useDeepCompareEffect(() => {
    const currentUser = customer ? customer : undefined;
    console.debug(currentUser);
    const currentCart = cart ? cart : undefined;
    console.debug(currentCart);

    // @ts-ignore
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
};

export default NostoSession;
