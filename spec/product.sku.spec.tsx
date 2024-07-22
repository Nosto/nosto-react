import React from "react"
import { render, screen, waitFor } from "@testing-library/react"
import { NostoProvider, NostoPlacement, NostoProduct } from "../src/index"
import RecommendationComponent from "./renderer"
import "@testing-library/jest-dom"
import { listenTo, WAIT_FOR_TIMEOUT } from "./utils"

test("Product page with SKU id", async () => {
  const tagging = {
    product_id: "7078777258043",
    selected_sku_id: "234"
  }
  
  render(
    <NostoProvider 
      account="shopify-11368366139" 
      recommendationComponent={<RecommendationComponent />}
    >
      <NostoPlacement id="productpage-nosto-1" />
      <NostoProduct product={tagging.product_id} tagging={tagging} />
    </NostoProvider>
  )
  
  await waitFor(() => {
    expect(screen.getAllByTestId("recommendation")).toHaveLength(1)
  }, { timeout: WAIT_FOR_TIMEOUT })
  
  const requests = listenTo("prerequest")
  
  expect(requests).toEqual([{
    cart_popup: false,
    elements: ["productpage-nosto-1"],
    events: [["vp", "7078777258043", undefined, undefined, "234"]],
    page_type: "product",
    response_mode: "JSON_ORIGINAL",
    url: "http://localhost/"
  }])
})
  