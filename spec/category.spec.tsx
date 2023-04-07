import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { NostoProvider, NostoCategory } from "../src/index.client";

test("Category render", async () => {
  // ARRANGE
  render(
    <NostoProvider account="shopify-11368366139">
      <div>
        <h1>Category</h1>
        <NostoCategory category="Rings" />
      </div>
    </NostoProvider>
  );
  screen.logTestingPlaygroundURL();
  // ACT
  await screen.findByRole("heading");
  // ASSERT
  expect(document.getElementsByClassName("nosto_category").length).toBe(1);
  expect(screen.getByText("Rings"));
});
