import React from "react";

import { useNostoContext } from "../Provider/context.client";
import { Cart, Customer } from "../../types";
import { snakeize } from "../../utils/snakeize";
import { useDeepCompareEffect } from "../../utils/hooks";

interface NostoSessionProps {
  cart: Cart;
  customer: Customer;
}

const NostoSession: React.FC<NostoSessionProps> = ({ cart, customer }) => {
  const { clientScriptLoaded } = useNostoContext();

  useDeepCompareEffect(() => {
    const currentCart = cart ? snakeize(cart) : undefined;
    const currentCustomer = customer ? snakeize(customer) : undefined;

    if (clientScriptLoaded) {
      window.nostojs((api) => {
        api
          .defaultSession()
          .setResponseMode("HTML")
          .setCart(currentCart)
          .setCustomer(currentCustomer)
          .viewOther()
          .load();
      });
    }
  }, [clientScriptLoaded, cart, customer]);

  return <></>;
};

export default NostoSession;
