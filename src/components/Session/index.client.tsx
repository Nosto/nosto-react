import React from "react";
import snakeize from "snakeize";
import { useNostoContext } from "../Provider/context.client";

import useDeepCompareEffect from "use-deep-compare-effect";
import { Cart, Customer } from "../../types";

interface NostoSessionProps {
  cart: Cart;
  customer: Customer;
}

const NostoSession: React.FC<NostoSessionProps> = ({ cart, customer }) => {
  const { clientScriptLoaded } = useNostoContext();
  useDeepCompareEffect(() => {
    const currentCart = cart || undefined;
    
    const currentCustomer = customer || undefined;
    console.debug(currentCart,currentCustomer);

    // @ts-ignore
    if (clientScriptLoaded) {
      window.nostojs((api: any) => {
        api
          .defaultSession()
          .setResponseMode("HTML")
          .setCart(snakeize(currentCart))
          .setCustomer(snakeize(currentCustomer))
          .viewOther()
          .load();
      });
    }
  }, [clientScriptLoaded, cart || [], customer || {}]);

  return <></>;
};

export default NostoSession;
