import { vi } from "vitest"
import { jsonMockData } from "./mock-data"

type ProductTagging = {
  product_id: string
  selected_sku_id?: string
}

type Data = {
  elements?: string[]
  responseMode: string
  variation?: string
  pageType?: string
  products: ProductTagging[]
  categories?: string[]
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
        viewCart: (category: string) => {
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
      ...getPageAction(pageType, placements, data)
    }),
    getData: () => data
  }
}
