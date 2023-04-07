import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { NostoProvider, NostoHome } from "../src/index.client";

test("Home page render", async () => {
  // ARRANGE
  render(
    <NostoProvider
      account="shopify-11368366139"
      recommendationComponent={({ nostoRecommendation }: any) => {
        console.log("nostoRecommendation", nostoRecommendation);
        return <div className="myrec">Hello</div>;
      }}
    >
      <div>
        <h1>reter</h1>
        <NostoHome />
      </div>
    </NostoProvider>
  );
  screen.logTestingPlaygroundURL();

  await waitFor(() => screen.findByDisplayValue("Hello"));

  expect(screen.getByText("Hello"));
});
