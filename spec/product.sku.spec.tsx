import React, { useState } from "react"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { NostoProvider, NostoPlacement, NostoProduct } from "../src/index"
import RecommendationComponent from "./renderer"
import "@testing-library/jest-dom"
import { listenTo, WAIT_FOR_TIMEOUT } from "./utils"

function ProductPage() {
  const productId = "7078777258043"
  const [skuId, setSkuId] = useState("123")

  const tagging = {
    product_id: productId,
    selected_sku_id: skuId
  }

  return <>
    <NostoPlacement id="productpage-nosto-1" />
    <NostoProduct product={productId} tagging={tagging} />
    <select data-testid="select" value="123" onChange={e => setSkuId(e.target.value)}>
      <option value="123">SKU 123</option>
      <option value="234">SKU 234</option>
    </select>
  </>
}

test("Product page with SKU id", async () => {
  render(
    <NostoProvider 
      account="shopify-11368366139" 
      recommendationComponent={<RecommendationComponent />}
    >
      <ProductPage />
    </NostoProvider>
  )
  
  await waitFor(() => {
    expect(screen.getAllByTestId("recommendation")).toHaveLength(1)
  }, { timeout: WAIT_FOR_TIMEOUT })
  
  const requests = listenTo("prerequest")
  
  expect(requests).toEqual([{
    cart_popup: false,
    elements: ["productpage-nosto-1"],
    events: [["vp", "7078777258043", undefined, undefined, "123"]],
    page_type: "product",
    response_mode: "JSON_ORIGINAL",
    url: "http://localhost/"
  }])
  requests.length = 0

  fireEvent.change(screen.getByTestId('select'), { target: { value: "234" } })

  expect(requests).toEqual([{
    cart_popup: false,
    elements: ["productpage-nosto-1"],
    events: [["vp", "7078777258043", undefined, undefined, "234"]],
    page_type: "product",
    response_mode: "JSON_ORIGINAL",
    url: "http://localhost/"
  }])
})
  