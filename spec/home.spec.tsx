import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { NostoProvider, NostoHome } from "../src/index.client";

test("Home page render", async () => {
  const dom = render(
    <NostoProvider
      account="shopify-11368366139"
      recommendationComponent={({ nostoRecommendation }: any) => {
        console.log("nostoRecommendation", nostoRecommendation);
        return <div data-testid="rec">Hello</div>;
      }}
    >
      <NostoHome />
    </NostoProvider>
  );

  await waitFor(() => {
    expect(screen.getByTestId('rec')).toBeDefined()
  });
});
