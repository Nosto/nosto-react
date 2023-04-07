import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { NostoProvider, NostoCheckout } from "../src/index.client";

test("404 render", async () => {
  // ARRANGE
  render(
    <NostoProvider account="shopify-11368366139">
      <div>
        <h1>Checkout</h1>
        <NostoCheckout />
      </div>
    </NostoProvider>
  );
  screen.logTestingPlaygroundURL();
  // ACT
  await screen.findByRole("heading");
  // ASSERT
  expect(screen.getByText("cart"));
});
