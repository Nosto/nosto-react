import { vi } from "vitest"
import { jsonMockData } from "./mock-data"
import { Product } from "../../src"
import { Action, ActionResponse, Cart, Customer, Data, RenderMode } from "../../src/types"

type LoadAction = {
  load: () => Promise<Partial<ActionResponse>>
}

type PlacementAction = {
  setPlacements: (placements: string[]) => LoadAction
}

type SessionData = Partial<Data> & { responseMode: RenderMode }

function normaliseProduct(data: Product | string) {
  return typeof data === "string" ? { product_id: data } : data
}

function newAction(pageType: string, state: SessionData, placementAction: PlacementAction) {
  switch (pageType) {
    case "front": {
      return {
        viewFrontPage: () => {
          state.pageType = "front"
          return placementAction
        }
      }
    }
    case "product": {
      return {
        viewProduct: (product: Product | string) => {
          state.pageType = "product"
          state.products = [normaliseProduct(product)]
          return placementAction
        }
      }
    }
    case "category": {
      return {
        viewCategory: (category: string) => {
          state.pageType = "category"
          state.categories = [category]
          return placementAction
        }
      }
    }
    case "cart": {
      return {
        viewCart: () => {
          state.pageType = "cart"
          return placementAction
        }
      }
    }
    case "search": {
      return {
        viewSearch: (...searchTerms: string[]) => {
          state.pageType = "search"
          state.searchTerms = searchTerms
          return placementAction
        }
      }
    }
    case "search": {
      return {
        viewSearch: (...searchTerms: string[]) => {
          state.pageType = "search"
          state.searchTerms = searchTerms
          return placementAction
        }
      }
    }
    case "other": {
      return {
        viewOther: () => {
          return placementAction
        }
      }
    }
    default: {
    }
  }
}

export default function (pageType: string, placements: string[]) {
  const data: SessionData = {
    responseMode: "HTML"
  }
  return {
    placements: {
      injectCampaigns: vi.fn(),
      getPlacements: () => placements
    },
    defaultSession: () => ({
      setVariation: (variation: string) => {
        data.variation = variation
        return {
          setResponseMode: (responseMode: RenderMode) => {
            data.responseMode = responseMode
          }
        }
      },
      setCart: (cart?: Cart) => {
        data.cart = cart
        return {
          setCustomer: (customer: Customer) => {
            data.customer = customer
            return {
              viewOther: () => ({
                load: () => Promise.resolve(jsonMockData(placements))
              })
            }
          }
        }
      },
      ...newAction(pageType, data, {
        setPlacements: (placements: string[]) => {
          data.elements = placements
          return {
            load: () => Promise.resolve(jsonMockData(placements))
          }
        }
      })
    }),
    getData: () => data
  }
}
