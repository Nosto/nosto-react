import { vi } from "vitest"
import { jsonMockData } from "./mock-data"
import { Product } from "../../src"
import { Action, Data, NostoClient, PageType, Session } from "../../src/types"

function normalizeProduct(data: Product | string) {
  return typeof data === "string" ? { product_id: data } : data
}

let latestActionData: Partial<Data>

function newSession(placements: string[]) {
  const data: Partial<Data> & { responseMode?: string} = {}

  function newAction(pageType: PageType, overrides?: Partial<Data>) {
    const actionData = { ...data, ...overrides,  pageType }
    latestActionData = actionData
  
    return {
      setPlacements(elements = placements) {
        return Object.assign(actionData, { elements }) && this
      },
      setRef(productId, reference) {
        return Object.assign(actionData, { ref: { [productId]: reference } }) && this
      },
      load: () => Promise.resolve(jsonMockData(actionData.elements ?? []))
    } as Action
  }

  return {
    setVariation(variation) {
      return Object.assign(data, { variation }) && this
    },
    setResponseMode(responseMode) {
      return Object.assign(data, { responseMode }) && this
    },
    setCart(cart) {
      return Object.assign(data, { cart }) && this
    },
    setCustomer(customer) {
      return Object.assign(data, { customer }) && this
    },
    viewFrontPage: () => newAction("front"),
    viewProduct: product => newAction("product", { products: [normalizeProduct(product)] }),
    viewCategory: category => newAction("category", { categories: [category] }),
    viewSearch: search => newAction("search", { searchTerms: [search] }),
    viewCart: () => newAction("cart"),
    viewOther: () => newAction("other"),
    viewNotFound: () => newAction("notfound")
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
