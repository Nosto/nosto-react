import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import {
  NostoProvider,
  NostoOther,
  NostoPlacement,
  Recommendation
} from "../src/index.client";

import "@testing-library/jest-dom";

const RecommendationComponent: React.ComponentType<{nostoRecommendation?: Recommendation}> = ({
  nostoRecommendation,
}) => {
  return (
    <div className="nosto-list" data-testid="recommendation">
      {nostoRecommendation?.products.map((product, i) => (
        <div key={i} data-testid="recommendation-product">
          <div data-testid="recommendation-product-name">{product.name}</div>
        </div>
      ))}
    </div>
  );
};

test("Other page render", async () => {
  render(
    <NostoProvider
      account="shopify-11368366139"
      recommendationComponent={<RecommendationComponent />}
    >
      <>
        <NostoPlacement id="cartpage-nosto-1" />
        <NostoPlacement id="categorypage-nosto-1" />
        <NostoPlacement id="productpage-nosto-1" />
        <NostoPlacement id="productpage-nosto-2" />
        <NostoOther />
      </>
    </NostoProvider>
  );

  await waitFor(() => {
    expect(screen.getAllByTestId("recommendation")).toHaveLength(4);
  });

  expect(
    screen.getAllByTestId("recommendation-product").length
  ).toBeGreaterThanOrEqual(3);

  screen.getAllByTestId("recommendation-product-name").forEach((el) => {
    expect(el.textContent?.trim().length).toBeGreaterThan(5);
  });
});
