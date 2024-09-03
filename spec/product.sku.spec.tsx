import { useState } from "react"
import { test, expect } from "vitest"
import { fireEvent, render, screen } from "@testing-library/react"
import { NostoProvider, NostoPlacement, NostoProduct } from "../src/index"
import RecommendationComponent from "./renderer"
import { listenTo, waitForRecommendations } from "./utils"

function ProductPage() {
  const productId = "7078777258043"

  // variant data
  const [color, setColor] = useState("red")
  const [size, setSize] = useState("M")
  const colors = ["red", "blue", "green"]
  const sizes = ["S", "M", "L"]

  const tagging = {
    product_id: productId,
    selected_sku_id: `${color}-${size}`
  }

  return (
    <>
      <NostoPlacement id="productpage-nosto-1" />
      <NostoProduct product={productId} tagging={tagging} />
      <select data-testid="color" onChange={e => setColor(e.target.value)}>
        {colors.map(c => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <select data-testid="size" onChange={e => setSize(e.target.value)}>
        {sizes.map(s => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    </>
  )
}

test("Product page with SKU id", async () => {
  render(
    <NostoProvider account="shopify-11368366139" recommendationComponent={<RecommendationComponent />}>
      <ProductPage />
    </NostoProvider>
  )

  await waitForRecommendations(1)
  
  const requests = listenTo("prerequest")

  expect(requests).toEqual([
    {
      cart_popup: false,
      elements: ["productpage-nosto-1"],
      events: [["vp", "7078777258043", undefined, undefined, "red-M"]],
      page_type: "product",
      response_mode: "JSON_ORIGINAL",
      url: "http://localhost/"
    }
  ])
  requests.length = 0

  // change color
  fireEvent.change(screen.getByTestId("color"), { target: { value: "blue" } })

  expect(requests).toEqual([
    {
      cart_popup: false,
      elements: ["productpage-nosto-1"],
      events: [["vp", "7078777258043", undefined, undefined, "blue-M"]],
      page_type: "product",
      response_mode: "JSON_ORIGINAL",
      url: "http://localhost/"
    }
  ])
  requests.length = 0

  // change size
  fireEvent.change(screen.getByTestId("size"), { target: { value: "L" } })

  expect(requests).toEqual([
    {
      cart_popup: false,
      elements: ["productpage-nosto-1"],
      events: [["vp", "7078777258043", undefined, undefined, "blue-L"]],
      page_type: "product",
      response_mode: "JSON_ORIGINAL",
      url: "http://localhost/"
    }
  ])
})
