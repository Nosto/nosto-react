import { vi } from "vitest"
import { jsonMockData } from "./mock-data"

type ProductTagging = {
  product_id: string
  selected_sku_id?: string
}

type Customer = {
  email: string
  first_name: string
  last_name: string
  type: string
}

type Data = {
  elements?: string[]
  responseMode: string
  variation?: string
  pageType?: string
  products: ProductTagging[]
  categories?: string[]
  cart?: unknown
  customer?: Customer
  searchTerms?: string[]
}

function normaliseProduct(data: ProductTagging | string) {
  return typeof data === "string" ? { product_id: data } : data
}

function getPageAction(pageType: string, placements: string[], state: Data) {
  switch (pageType) {
    case "front": {
      return {
        viewFrontPage: () => {
          state.pageType = "front"
          return {
            setPlacements: (placements: string[]) => {
              state.elements = placements
              return {
                load: () => Promise.resolve(jsonMockData(placements))
              }
            }
          }
        }
      }
    }
    case "product": {
      return {
        viewProduct: (product: ProductTagging | string) => {
          state.pageType = "product"
          state.products = [normaliseProduct(product)]
          return {
            setPlacements: (placements: string[]) => {
              state.elements = placements
              return {
                load: () => Promise.resolve(jsonMockData(placements))
              }
            }
          }
        }
      }
    }
    case "category": {
      return {
        viewCategory: (category: string) => {
          state.pageType = "category"
          state.categories = [category]
          return {
            setPlacements: (placements: string[]) => {
              state.elements = placements
              return {
                load: () => Promise.resolve(jsonMockData(placements))
              }
            }
          }
        }
      }
    }
    case "cart": {
      return {
        viewCart: () => {
          state.pageType = "cart"
          return {
            setPlacements: (placements: string[]) => {
              state.elements = placements
              return {
                load: () => Promise.resolve(jsonMockData(placements))
              }
            }
          }
        }
      }
    }
    case "search": {
      return {
        viewSearch: (...searchTerms: string[]) => {
          state.pageType = "search"
          state.searchTerms = searchTerms
          return {
            setPlacements: (placements: string[]) => {
              state.elements = placements
              return {
                load: () => Promise.resolve(jsonMockData(placements))
              }
            }
          }
        }
      }
    }
    case "search": {
      return {
        viewSearch: (...searchTerms: string[]) => {
          state.pageType = "search"
          state.searchTerms = searchTerms
          return {
            setPlacements: (placements: string[]) => {
              state.elements = placements
              return {
                load: () => Promise.resolve(jsonMockData(placements))
              }
            }
          }
        }
      }
    }
    case "other": {
      return {
        viewOther: () => {
          return {
            setPlacements: (placements: string[]) => {
              state.elements = placements
              return {
                load: () => Promise.resolve(jsonMockData(placements))
              }
            }
          }
        }
      }
    }
    default: {
    }
  }
}

export default function (pageType: string, placements: string[]) {
  const data: Data = {
    responseMode: "HTML",
    products: []
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
          setResponseMode: (responseMode: string) => {
            data.responseMode = responseMode
          }
        }
      },
      setCart: (cart: unknown) => {
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
      ...getPageAction(pageType, placements, data)
    }),
    getData: () => data
  }
}
