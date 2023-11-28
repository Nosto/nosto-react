import React from "react"
import { render, screen, waitFor } from "@testing-library/react"
import { NostoProvider, Nosto404, NostoPlacement } from "../src/index"
import RecommendationComponent from "./renderer"
import "@testing-library/jest-dom"
import { WAIT_FOR_TIMEOUT } from "./utils"

test("404 page render", async () => {
  render(
    <NostoProvider
      account="shopify-11368366139"
      recommendationComponent={<RecommendationComponent />}
    >
      <>
        <NostoPlacement id="notfound-nosto-1" />
        <NostoPlacement id="notfound-nosto-2" />
        <Nosto404 />
      </>
    </NostoProvider>
  )

  await waitFor(() => {
    expect(screen.getAllByTestId("recommendation")).toHaveLength(2)
  }, { timeout: WAIT_FOR_TIMEOUT })

  expect(screen.getAllByTestId("recommendation-product").length).toBeGreaterThanOrEqual(3)

  screen.getAllByTestId("recommendation-product-name").forEach(el => {
    expect(el.textContent?.trim().length).toBeGreaterThan(5)
  })
})
