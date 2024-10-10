import { useState } from "react"
import { test, expect } from "vitest"
import { fireEvent, render, screen } from "@testing-library/react"
import { NostoProvider, NostoPlacement, NostoProduct } from "../src/index"
import RecommendationComponent from "./renderer"
import { waitForRecommendations } from "./utils"
import mockApi from "./mocks/mock-api"
import { mockNostojs } from "@nosto/nosto-js/testing"

function ProductPage() {
  const productId = "dummy-product-id"

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
  const placements = ["productpage-nosto-1"]
  const mocked = mockApi(placements)
  mockNostojs(mocked)

  render(
    <NostoProvider account="dummy-account" recommendationComponent={<RecommendationComponent />} loadScript={false}>
      <ProductPage />
    </NostoProvider>
  )

  await waitForRecommendations(1)

  expect(mocked.getData()).toEqual({
    elements: placements,
    responseMode: "JSON_ORIGINAL",
    variation: "",
    pageType: "product",
    products: [{ product_id: "dummy-product-id", selected_sku_id: "red-M" }]
  })

  // change color
  fireEvent.change(screen.getByTestId("color"), { target: { value: "blue" } })

  expect(mocked.getData()).toEqual({
    elements: placements,
    responseMode: "JSON_ORIGINAL",
    variation: "",
    pageType: "product",
    products: [{ product_id: "dummy-product-id", selected_sku_id: "blue-M" }]
  })

  // change size
  fireEvent.change(screen.getByTestId("size"), { target: { value: "L" } })

  expect(mocked.getData()).toEqual({
    elements: placements,
    responseMode: "JSON_ORIGINAL",
    variation: "",
    pageType: "product",
    products: [{ product_id: "dummy-product-id", selected_sku_id: "blue-L" }]
  })
})
