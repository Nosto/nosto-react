import { test, expect } from "vitest"
import { render, screen, waitFor} from "@testing-library/react"
import { NostoHome, NostoPlacement, NostoProvider, NostoSession } from "../src/index"
import RecommendationComponent from "./renderer"
import { listenTo, WAIT_FOR_TIMEOUT } from "./utils"

test("Session render", async () => {
  const requests = listenTo("prerequest")

  const customer = {
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@acme.com"
  }

  render(
    <NostoProvider
      account="shopify-11368366139"
      recommendationComponent={<RecommendationComponent />}
    >      
      <NostoPlacement id="frontpage-nosto-1" />
      <NostoPlacement id="frontpage-nosto-3" />
      <NostoPlacement id="frontpage-nosto-4" />
      <NostoSession customer={customer}/>
      <NostoHome />      
    </NostoProvider>
  )

  await waitFor(() => {
    expect(screen.getAllByTestId("recommendation")).toHaveLength(3)
  }, { timeout: WAIT_FOR_TIMEOUT })
  
  expect(requests).toEqual([
    {
      cart_popup: false,
      customer: {
        email: "john.doe@acme.com",
        first_name: "John",
        last_name: "Doe",
        type: "loggedin"
      },
      events: [],
      response_mode: "HTML",
      url: "http://localhost/"
    },
    {
      cart_popup: false,
      customer: {
        email: "john.doe@acme.com",
        first_name: "John",
        last_name: "Doe",
        type: "loggedin"
      },
      elements: [
        "frontpage-nosto-1",
        "frontpage-nosto-3",
        "frontpage-nosto-4",
      ],
      events: [],
      page_type: "front",
      response_mode: "JSON_ORIGINAL",
      url: "http://localhost/"
    }
  ])

})
