import { vi } from "vitest"
import { jsonMockData } from "./mock-data"
import { Product } from "../../src"
import { API, Session, Action, PageType, TaggingData } from "@nosto/nosto-js/client"

function normalizeProduct(data: Product | string) {
  return typeof data === "string" ? { product_id: data } : data
}

let latestActionData: Partial<TaggingData>
const eventListeners: Record<string, ((data: unknown) => void)[]> = {}

function newSession(defaultPlacements: string[]) {
  const data: Partial<TaggingData> & { responseMode?: string} = {}

  function newAction(pageType: PageType, overrides?: Partial<TaggingData>) {
    const actionData = { ...data, ...overrides,  pageType }
    latestActionData = actionData
  
    return {
      setPlacements(elements?: string[]) {
        return Object.assign(actionData, { elements: elements ?? defaultPlacements }) && this
      },
      setRef(productId, reference) {
        return Object.assign(actionData, { ref: { [productId]: reference } }) && this
      },
      load: () => {
        // Trigger prerequest event before returning the response
        if (eventListeners["prerequest"]) {
          const eventData: Record<string, unknown> = {
            page_type: actionData.pageType,
            response_mode: actionData.responseMode || "JSON_ORIGINAL",
            url: window.location.href
          }
          // Use the elements from actionData if set, otherwise use defaultPlacements
          const elements = actionData.elements ?? defaultPlacements
          if (elements && elements.length > 0) {
            eventData.elements = elements
          }
          if (actionData.categories && actionData.categories.length > 0) {
            eventData.categories = actionData.categories
          }
          if (actionData.products && actionData.products.length > 0) {
            eventData.events = actionData.products.map(p => ["vp", normalizeProduct(p).product_id])
          }
          eventListeners["prerequest"].forEach(callback => callback(eventData))
        }
        // Return mock data using the elements from actionData or defaultPlacements
        return Promise.resolve(jsonMockData(actionData.elements ?? defaultPlacements))
      }
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

  // TODO: Fix mock
  return {
    setAutoLoad: vi.fn(),
    listen: vi.fn((event: string, callback: (data: unknown) => void) => {
      if (!eventListeners[event]) {
        eventListeners[event] = []
      }
      eventListeners[event].push(callback)
    }),
    placements: {
      injectCampaigns: vi.fn(),
      getPlacements: () => placements,
    } as unknown as API["placements"],
    defaultSession: () => session,
    getData: () =>  latestActionData,
  }
}
