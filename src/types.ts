import { ComponentType } from "react";

export interface Item {
  name: string;
  price_currency_code: string;
  product_id: string;
  quantity: number;
  sku_id: string;
  unit_price: number;
}

export interface Cart {
  items: Item[];
}

export interface Customer {
  customer_reference: string;
  email: string;
  first_name: string;
  last_name: string;
  newsletter: boolean;
}

export interface Buyer {
  first_name: string;
  last_name: string;
  email: string;
  type: string;
  newsletter: boolean;
}

export interface Purchase {
  number: string;
  info: Buyer;
  items: Item[];
}

export interface SKU {
  id: string;
  name: string;
  price: number;
  listPrice?: number;
  url: URL;
  imageUrl: URL;
  gtin?: string;
  availability: 'InStock' | 'OutOfStock';
  customFields?: { [key: string]: string };
}

export interface Product {
  alternateImageUrls?: URL[];
  availability: 'InStock' | 'OutOfStock';
  brand?: string;
  category: string[];
  categoryIds?: string[];
  description: string;
  googleCategory?: string;
  condition?: string;
  gender?: string;
  ageGroup?: string;
  gtin?: string;
  imageUrl: URL;
  listPrice?: number;
  name: string;
  price: number;
  ratingValue?: number;
  reviewCount?: number;
  priceCurrencyCode: string;
  productId: string;
  tags1?: string[];
  tags2?: string[];
  tags3?: string[];
  thumbUrl?: URL;
  url: URL;
  customFields?: { [key: string]: string };
  variationId?: string;
  skus?: SKU[];
}

export type AnyFilter =
    | {
          not: AnyFilter
      }
    | {
          any: ReadonlyArray<AnyFilter>
      }
    | {
          all: ReadonlyArray<AnyFilter>
      }
    | {
          field: string
          value: AnyFilterValue[]
          filterFacets?: boolean
      }
    | {
          field: string
          hasValue: boolean
      }

export type AnyFilterValue =
    | string
    | number
    | boolean
    | {
          gt?: string | number
          gte?: string | number
          lt?: string | number
          lte?: string | number
      }

export interface SearchQuery {
  readonly name?: string
  readonly query?: string
  readonly segments?: string
  readonly rules?: ReadonlyArray<string>
  readonly customRules?:
      | Record<
            string,
            {
                readonly name?: string
                readonly enabled: boolean
            }
        >
      | Record<
            string,
            {
                readonly name?: string
                readonly schedule: ReadonlyArray<{
                    readonly from: string // "2015-02-27T12:00:00Z"
                    readonly to: string // "2015-02-28T12:00:00Z"
                    readonly fromTime: string // "12:00:00"
                    readonly toTime: string // "16:00:00"
                    readonly timezone: string // "Europe/Paris"
                    readonly type: 'WEEKLY' | 'DAILY'
                    readonly weekdays:
                        | 'MONDAY'
                        | 'TUESDAY'
                        | 'WEDNESDAY'
                        | 'THURSDAY'
                        | 'FRIDAY'
                        | 'SATURDAY'
                        | 'SUNDAY'
                }>
                readonly match: Record<string, ReadonlyArray<{}>>
            }
        >
  readonly explain?: boolean // with private key only
  readonly time?: string // with private key only, example "2015-02-27T12:00:00Z"
  readonly products?: {
      readonly fields?: ReadonlyArray<string>
      readonly variationId?: string // "EUR"
      readonly size?: number
      readonly from?: number
      readonly queryFields?: ReadonlyArray<'high' | 'medium' | 'low'>
      readonly explain?: boolean
      readonly facets?: ReadonlyArray<string>
      readonly customFacets?: Record<
          string,
          {
              readonly type: 'terms' | 'stats'
              readonly field: string // "brand"
              readonly order?: string // "index"
              readonly name?: string // "Brand"
              readonly enabled?: boolean
          }
      >
      readonly sort?: ReadonlyArray<{
          readonly field: string
          readonly order: 'asc' | 'desc'
      }>
      readonly emptyQueryMatchesAll?: boolean
      readonly outOfStockBehaviour?: boolean
      readonly exclusionBehaviour?: boolean
      readonly showPrivateFields?: boolean
      readonly relevanceWeight?: number
      readonly personalizationWeight?: number
      readonly personalizationBoost?: Record<string, Record<string, number>>
      readonly boost?: ReadonlyArray<
          | {
                readonly field: string
                readonly weight: number
                readonly value?: string
            }
          | (Record<
                any,
                ReadonlyArray<{
                    readonly field: string
                    readonly value?: ReadonlyArray<Record<string, unknown>>
                    readonly hasValue?: boolean
                }>
            > & { readonly weight: number })
      >
      readonly filter?: ReadonlyArray<AnyFilter>
      readonly keywords?: {
          readonly size: number
      }
  }
}

export interface SearchResponse {
  readonly query: string
  readonly autocorrect?: {
      original: string
  }
  readonly products?: {
      readonly hits: ReadonlyArray<Record<string, undefined>>
      readonly total: number
      readonly size: number
      readonly from: number
      readonly facets?: ReadonlyArray<
          | {
                readonly type: 'terms'
                readonly id: string
                readonly field: string
                readonly data: ReadonlyArray<{
                    readonly value: string
                    readonly count: number
                    readonly selected: boolean
                }>
                readonly name: string
            }
          | {
                readonly type: 'stats'
                readonly id: string
                readonly field: string
                readonly min: number
                readonly max: number
                readonly name: string
            }
      >
  }
  readonly keywords?: {
      readonly total: number
      readonly hits: ReadonlyArray<{
          keyword: string
          categories?: ReadonlyArray<string>
      }>
      readonly size: number
  }
  readonly segments?: {
      active_segments?: ReadonlyArray<{
          id: string
      }>
  }
}


export interface SearchState {
  id: string
  account: string
  loading: Boolean
  query: SearchQuery
  response: SearchResponse
  initialized: boolean
}

export interface SearchConfig {
  /**
   * CSS selector for each input element to bind search events like input change and form submit.
   */
  inputCssSelector: string
  /**
   * CSS selector for search page rendering.
   */
  contentCssSelector?: string
  /**
   * CSS selector for form to unbind it.
   */
  formCssSelector: string
  /**
   * CSS selector for autocomplete dropdown render.
   * Leave undefined for default use (After input element)
   */
  dropdownCssSelector?: string
  /**
   * Merchant ID.
   */
  merchant: string
  /**
   * API key.
   */
  apiKey: string
  /**
   * API key.
   */
  searchApiUrl: string
  /**
   * Default search page query parameters.
   */
  serpQuery?: Partial<SearchQuery>
  /**
   * Preact search page main component.
   */
  serpComponent?: ComponentType
  /**
   * Search page path, renders in any page if not specified
   */
  serpPath?: string
  /**
   * Preact autocomplete main component
   */
  autocompleteComponent?: ComponentType
  /**
   * Default autocomplete query parameters.
   */
  autocompleteQuery?: Partial<SearchQuery>
  /**
   * Minimal input length to render autocomplete
   *
   * @default: 2
   */
  autocompleteMinLength: number
  /**
   * Front end URL both ways mapping, to convert URL param values and keep the request keys
   * {
   *    query: 'q' - will map query param to appear as q in URL
   *    product.filters: 'ff' - will map to ff.0.field.0: 'brand' and so on..
   *    product.size: 'size' - will map to size: 24
   * }
   */
  serpUrlMapping: Record<string, string>
}