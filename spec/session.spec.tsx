import { test, expect } from "vitest"
import { render } from "@testing-library/react"
import { NostoHome, NostoPlacement, NostoProvider, NostoSession } from "../src/index"
import RecommendationComponent from "./renderer"
import { waitForRecommendations } from "./utils"
import mockApi from "./mocks/mock-api"
import { mockNostojs } from "@nosto/nosto-js/testing"

test("Session render", async () => {
  const placements = ["frontpage-nosto-1", "frontpage-nosto-3", "frontpage-nosto-4"]
  const mocked = mockApi(placements)
  mockNostojs(mocked)

  const customer = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@acme.com"
  }

  render(
    <NostoProvider account="dummy-account" recommendationComponent={<RecommendationComponent />} loadScript={false}>
      <NostoPlacement id="frontpage-nosto-1" />
      <NostoPlacement id="frontpage-nosto-3" />
      <NostoPlacement id="frontpage-nosto-4" />
      <NostoSession customer={customer} />
      <NostoHome />
    </NostoProvider>
  )

  await waitForRecommendations(3)

  expect(mocked.getData()).toEqual({
    cart: undefined,
    customer: {
      email: "john.doe@acme.com",
      first_name: "John",
      last_name: "Doe"
    },
    elements: ["frontpage-nosto-1", "frontpage-nosto-3", "frontpage-nosto-4"],
    pageType: "front",
    variation: "",
    responseMode: "JSON_ORIGINAL"
  })
})
