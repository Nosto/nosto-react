import type { API, CartItem, ConversionItem, OrderCustomer, PushedProduct } from "@nosto/nosto-js/client"

declare global {
  interface Window {
    nosto?: {
      reload(settings: unknown): void
    }
    nostojs: {
      (callback: (api: API) => void): void
      q?: unknown[]
    }
  }
}

/**
 * @group Types
 */
export interface Recommendation {
  result_id: string
  products: PushedProduct[]
  result_type: string
  title: string
  div_id: string
  source_product_ids: string[]
  params: unknown
}

/**
 * @group Types
 */
export interface Order {
  created_at?: Date
  external_order_ref: string
  info?: OrderCustomer
  items: ConversionItem[]
  order_status?: string
  order_status_label?: string
  payment_provider: string
}

/**
 * @group Types
 */
export interface Cart {
  hcid?: string
  items: CartItem[]
}
