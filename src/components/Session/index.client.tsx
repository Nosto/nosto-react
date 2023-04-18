import { useNostoContext } from "../Provider/context.client";
import { Cart, Customer } from "../../types";
import { snakeize } from "../../utils/snakeize";
import { useDeepCompareEffect } from "../../utils/hooks";

/**
 * Nosto React requires that you pass it the details of current cart contents and the details of the currently logged-in customer, if any, on every route change.
 * This makes it easier to add attribution.
 *
 * The `NostoSession` component makes it very easy to keep the session up to date so long as the cart and the customer are provided.
 *
 * The cart prop requires a value that adheres to the type `Cart`, while the customer prop requires a value that adheres to the type `Customer`.
 *
 * @group Essential Functions
 */
export default function NostoSession(props: {
  cart: Cart;
  customer: Customer;
}): JSX.Element {
  const { cart, customer } = props;
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
}
