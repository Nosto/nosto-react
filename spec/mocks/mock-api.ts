import { vi } from "vitest"
import { jsonMockData } from "./mock-data"
import { Product } from "../../src"
import { API, Session, Action, PageType, TaggingData } from "@nosto/nosto-js/client"

function normalizeProduct(data: Product | string) {
  return typeof data === "string" ? { product_id: data } : data
}

let latestActionData: Partial<TaggingData>
let eventListeners: Record<string, Array<(data: any) => void>> = {}

function emitEvent(event: string, data: any) {
  const listeners = eventListeners[event] || []
  listeners.forEach(listener => listener(data))
}

function newSession(placements: string[]) {
  const data: Partial<TaggingData> & { responseMode?: string} = {}

  function newAction(pageType: PageType, overrides?: Partial<TaggingData>) {
    const actionData = { ...data, ...overrides,  pageType }
    latestActionData = actionData
  
    return {
      setPlacements(elements = placements) {
        // Store the elements in the action data
        actionData.elements = elements
        return this
      },
      setRef(productId, reference) {
        return Object.assign(actionData, { ref: { [productId]: reference } }) && this
      },
      load: () => {
        // Emit prerequest event before loading
        const eventData: any = {
          page_type: actionData.pageType,
          response_mode: actionData.responseMode || 'JSON_ORIGINAL',
          url: typeof window !== 'undefined' ? window.location.href : 'http://localhost/'
        }
        
        // Only include fields that are set
        if (actionData.elements) {
          eventData.elements = actionData.elements
        }
        if (actionData.categories) {
          eventData.categories = actionData.categories
        }
        if (actionData.products) {
          eventData.events = actionData.products.map(p => ['vp', typeof p === 'string' ? p : p.product_id])
        }
        
        emitEvent('prerequest', eventData)
        return Promise.resolve(jsonMockData(actionData.elements ?? []))
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

  return {
    setAutoLoad: vi.fn(),
    listen: (event: string, callback: (data: any) => void) => {
      if (!eventListeners[event]) {
        eventListeners[event] = []
      }
      eventListeners[event].push(callback)
    },
    placements: {
      injectCampaigns: vi.fn(),
      getPlacements: () => {
        // Scan DOM for nosto_element divs to get currently rendered placements
        if (typeof document !== 'undefined') {
          const elements = document.querySelectorAll('.nosto_element')
          return Array.from(elements).map(el => el.id).filter(id => id)
        }
        return placements
      },
    } as unknown as API["placements"],
    defaultSession: () => session,
    getData: () =>  latestActionData,
  }
}

// Export for cleanup in tests
export function clearEventListeners() {
  eventListeners = {}
}
