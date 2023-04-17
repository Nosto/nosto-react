import React from "react";

import { useNostoContext } from "../Provider/context.client";
import { Cart, Customer } from "../../types";
import { snakeize } from "../../utils/snakeize";
import { useDeepCompareEffect } from "../../utils/hooks";

export interface NostoSessionProps {
  /**
   * Cart holds current items
   */
  cart: Cart;
  /**
   * The information about the currently logged-in customer.
   */
  customer: Customer;
}

/**
 * Makes it easy to keep the session up to date as long as the cart and the customer are provided.
 */
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
