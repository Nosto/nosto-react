import { test, expect } from "vitest"
import { NostoPlacement, NostoProvider, useNostoCategory, useNostoHome, useNostoProduct } from "../src"
import RecommendationComponent from "./renderer"
import { Link, BrowserRouter, Route, Routes, useParams } from "react-router-dom"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { listenTo, WAIT_FOR_TIMEOUT } from "./utils"
import { categoryEvent, frontEvent, productEvent } from "./events"

function HomePage() {
  useNostoHome()  
  return <>
    <NostoPlacement id="frontpage-nosto-1" />
    <NostoPlacement id="frontpage-nosto-3" />
    <NostoPlacement id="frontpage-nosto-4" />
    <Link to="/collections/hoodies">Hoodies</Link>
  </>    
}

function CategoryPage() {
  const { category } = useParams()
  useNostoCategory({ category: category! })
  return <>
    <NostoPlacement id="categorypage-nosto-1" />
    <NostoPlacement id="categorypage-nosto-2" />
    <Link to="/products/123">Product 123</Link>
    <Link to="/products/234">Product 234</Link>
    <Link to="/">Home</Link>
  </>
}

function ProductPage() {
  const { product } = useParams()
  useNostoProduct({ product: product! })
  return <>
    <NostoPlacement id="productpage-nosto-1" />
    <NostoPlacement id="productpage-nosto-2" />
    <NostoPlacement id="productpage-nosto-3" />
    <Link to="/products/234">Product 234</Link>
    <Link to="/collections/hoodies">Hoodies</Link>
    <Link to="/">Home</Link>
  </>
}

function Main() {
  return <NostoProvider
    account="shopify-11368366139"
    recommendationComponent={<RecommendationComponent />}> 
    <BrowserRouter>
      <Routes>
        <Route path="/collections/:category" element={<CategoryPage />} />
        <Route path="/products/:product" element={<ProductPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>    
    </BrowserRouter>
  </NostoProvider>  
}

test("navigation events", async () => {
  render(<Main />)

  await waitFor(() => {
    expect(screen.getAllByTestId("recommendation")).toHaveLength(3)
  }, { timeout: WAIT_FOR_TIMEOUT })

  const requests = listenTo("prerequest")

  function verifyEvents(given: unknown[]) {
    expect(requests).toEqual(given)
    requests.length = 0
  }
  
  // home -> category
  fireEvent.click(screen.getByText("Hoodies"))
  verifyEvents([ frontEvent(), categoryEvent("hoodies")])

  // category -> product
  fireEvent.click(screen.getByText("Product 123"))
  verifyEvents([ productEvent("123") ])

  // product -> product
  fireEvent.click(screen.getByText("Product 234"))
  verifyEvents([ productEvent("234") ])

  // product -> category
  fireEvent.click(screen.getByText("Hoodies"))
  verifyEvents([ categoryEvent("hoodies") ])

  // category -> home
  fireEvent.click(screen.getByText("Home"))
  verifyEvents([ frontEvent() ])
})