import { vi } from "vitest"
import { jsonMockData } from "./mock-data"
import { Product } from "../../src"
import { Action, Data, NostoClient, PageType, Session } from "../../src/types"

function normalizeProduct(data: Product | string) {
  return typeof data === "string" ? { product_id: data } : data
}

let latestActionData: Partial<Data>

function newAction(data: Partial<Data>) {
  latestActionData = data

  return {
    setPlacements(placements) {
      data.elements = placements
      return this
    },
    load() {
      return Promise.resolve(jsonMockData(data.elements ?? []))
    }
  } as Action
}

function newSession(placements: string[]) {
  const data: Partial<Data> & { responseMode?: string} = {
    elements: placements
  }

  return {
    setVariation(variation) {
      data.variation = variation
      return this
    },
    setResponseMode(mode) {
      data.responseMode = mode
      return this
    },
    setCart(cart) {
      data.cart = cart
      return this
    },
    setCustomer(customer) {
      data.customer = customer
      return this
    },
    viewFrontPage() {
      return newAction({ ...data, pageType: "front"})
    },
    viewProduct(product) {
      return newAction({ ...data, pageType: "product", products: [normalizeProduct(product)] })
    },
    viewCategory(category) {
      return newAction({ ...data, pageType: "category", categories: [category] })
    },
    viewSearch(search) {
      return newAction({ ...data, pageType: "search", searchTerms: [search] })
    },
    viewCart() {
      return newAction({ ...data, pageType: "cart" })
    },
    viewOther() {
      return newAction({ ...data, pageType: "other" })
    }
  } as Session

}

export default function (placements: string[]) {
  const session = newSession(placements)

  return {
    setAutoLoad: vi.fn(),
    listen: vi.fn(),
    placements: {
      injectCampaigns: vi.fn(),
      getPlacements: () => placements
    },
    defaultSession: () => session,
    getData: () =>  latestActionData,
  } satisfies NostoClient & { getData: () => Partial<Data> }
}
