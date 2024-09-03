declare global {
  interface Window {
    nosto?: {
      reload(settings: unknown): void
    }
    nostojs: {
      (callback: (api: NostoClient) => void): void
      q?: unknown[]
    }
  }
}

/**
 * @group Types
 */
export interface NostoClient {
  setAutoLoad(autoload: boolean): void
  defaultSession(): Session
  listen(event: string, callback: (data: unknown) => void): void
  placements: {
    getPlacements(): string[]
    injectCampaigns(recommendations: Record<string, unknown>): void
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

export interface PushedProduct {
  age_group?: string
  alternate_image_urls: string[]
  availability: string
  brand?: string
  category: string[]
  category_id: string[]
  condition?: string
  custom_fields: { [index: string]: string }
  date_published?: Date
  description?: string
  gender?: string
  google_category?: string
  gtin?: string
  image_url?: string
  inventory_level?: number
  list_price?: number
  name: string
  parent_category_id: string[]
  price: number
  price_currency_code: string
  product_id: string
  rating_value?: number
  review_count?: number
  skus: PushedProductSKU[]
  source_updated?: Date
  supplier_cost?: number
  tags1: string[]
  tags2: string[]
  tags3: string[]
  thumb_url?: string
  unit_pricing_base_measure?: number
  unit_pricing_measure?: number
  unit_pricing_unit?: string
  update_received?: Date
  url: string
  variation_id?: string
  variations: { [index: string]: PushedVariation }
}

export interface PushedProductSKU extends NostoSku {}

export interface PushedVariation extends NostoVariant {}

export interface NostoSku extends Sku {
  inventory_level?: number
}

export interface NostoVariant {
  availability: string
  available: boolean
  discounted: boolean
  list_price?: number
  price: number
  price_currency_code: string
  price_text?: string
}

export interface Sku {
  availability: string
  custom_fields: { [index: string]: string }
  gtin?: string
  id: string
  image_url?: string
  list_price?: number
  name: string
  price: number
  url?: string
}

// copied from client script d.ts export
declare const eventTypes: readonly [
  "vp",
  "lp",
  "dp",
  "rp",
  "bp",
  "vc",
  "or",
  "is",
  "cp",
  "ec",
  "es",
  "gc",
  "src",
  "cpr",
  "pl",
  "cc",
  "con"
]
declare type EventType = (typeof eventTypes)[number]

/**
 * @group Types
 */
export interface CartItem {
  name: string
  price_currency_code: string
  product_id: string
  quantity: number
  sku_id?: string
  unit_price: number
}

/**
 * @group Types
 */
export interface ConversionItem {
  name: string
  price_currency_code: string
  product_id: string
  quantity?: number
  sku_id?: string
  unit_price?: number
}

/**
 * @group Types
 */
export interface CustomerAffinityResponse {
  discount: number
  top_brands: CustomerAffinityResponseItem[]
  top_categories: CustomerAffinityResponseItem[]
  top_product_types: CustomerAffinityResponseItem[]
  top_skus: {
    [index: string]: CustomerAffinityResponseItem[]
  }
}

/**
 * @group Types
 */
export interface CustomerAffinityResponseItem {
  name: string
  score: number
}

/**
 * @group Types
 */
export interface OrderCustomer {
  country: string
  email?: string
  first_name?: string
  last_name?: string
  newsletter: string
  order_number: string
  phone: string
  post_code: string
  type: string
}

/**
 * @group Types
 */
export interface Customer {
  customer_reference?: string
  email: string
  first_name: string
  hcid?: string
  last_name: string
  newsletter?: boolean
  order_number?: string
  source?: string
  source_id?: string
  type?: string
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
export type PageType =
  | "front"
  | "category"
  | "product"
  | "cart"
  | "search"
  | "notfound"
  | "order"
  | "other"
  | "checkout"

/**
 * @group Types
 */
export type RenderMode =
  | "HTML"
  | "SIMPLE"
  | "JSON_170x170"
  | "JSON_100_X_100"
  | "JSON_90x70"
  | "JSON_50x50"
  | "JSON_30x30"
  | "JSON_100x140"
  | "JSON_200x200"
  | "JSON_400x400"
  | "JSON_750x750"
  | "JSON_10_MAX_SQUARE"
  | "JSON_200x200_SQUARE"
  | "JSON_400x400_SQUARE"
  | "JSON_750x750_SQUARE"
  | "JSON_ORIGINAL"
  | "VERSION_SOURCE"

/**
 * @group Types
 */
interface PluginMetadata {
  mainModule?: string
  cmpModule?: string
  msiModule?: string
}

/**
 * @group Types
 */
export interface Cart {
  hcid?: string
  items: CartItem[]
}

/**
 * @group Types
 */
export type Product = {
  product_id: string
  selected_sku_id?: string
}

/**
 * @group Types
 */
export interface Data<ProductType extends Product = Product> {
  cart: Cart | undefined
  customer: Customer | undefined
  variation: string | undefined
  restoreLink: string | undefined
  products: ProductType[]
  order: Order | undefined
  searchTerms: string[] | undefined
  categories: string[] | undefined
  categoryIds: string[] | undefined
  parentCategoryIds: string[] | undefined
  tags: string[] | undefined
  customFields: Record<string, string[]> | undefined
  elements: string[] | undefined
  pageType: PageType | undefined
  sortOrder: string | undefined
  pluginVersion: PluginMetadata | undefined
}

/**
 * @group Types
 */
export interface RecommendationRequestFlags {
  skipPageViews?: boolean
  trackEvents?: boolean
  skipEvents?: boolean
  reloadCart?: boolean
}

/**
 * @group Types
 */
export interface Session {
  /**
   * Sets the information about the user's current shopping cart. It the user
   * does not have any items in his shopping cart, you can pass <code>null<code>.
   * Passing <code>null<code> will nullify the user's shopping cart on Nosto's
   * end. You must also pass in the shopping cart content in it's entirety as
   * partial content are not supported.
   *
   * @example
   * nostojs(api => api
   *   .defaultSession()
   *   .setCart({
   *     items: [
   *       product_id: "101",
   *       sku_id: "101-S",
   *       name: "Shoe",
   *       unit_price: 34.99
   *       price_currency_code: "EUR"
   *     ]
   *   })
   *   .viewCart()
   *   .setPlacements(["free-shipper"])
   *   .update()
   *   .then(data => console.log(data)))
   *
   * @public
   * @param {Cart|undefined} cart the details of the user's shopping cart contents
   * @returns {Session} the current session
   */
  setCart(cart: Cart | undefined): Session
  /**
   * Sets the information about the currently logged in customer. If the current
   * customer is not provided, you will not be able to leverage features such as
   * triggered emails. While it is recommended to always provide the details of
   * the currently logged in customer, it may be omitted if there are concerns
   * about privacy or compliance.
   *
   * @example
   * nostojs(api => api
   *   .defaultSession()
   *   .setCustomer({
   *     first_name: "Mridang",
   *     last_name: "Agarwalla",
   *     email: "mridang@nosto.com",
   *     newsletter: false,
   *     customer_reference: "5e3d4a9c-cf58-11ea-87d0-0242ac130003"
   *   })
   *   .viewCart()
   *   .setPlacements(["free-shipper"])
   *   .load()
   *   .then(data => console.log(data)))
   *
   * @public
   * @param {Customer} customer the details of the currently logged in customer
   * @returns {Session} the current session
   */
  setCustomer(customer: Customer | undefined): Session
  /**
   * Sets the current variation identifier for the session. A variation identifier
   * identifies the current currency (or the current customer group). If your site
   * uses multi-currency, you must provide the ISO code current currency being viewed.
   *
   * @example
   * nostojs(api => api
   *   .defaultSession()
   *   .setVariation("GBP")
   *   .viewCart()
   *   .setPlacements(["free-shipper"])
   *   .load()
   *   .then(data => console.log(data)))
   *
   * @public
   * @param {String} variation the case-sensitive identifier of the current variation
   * @returns {Session} the current session
   */
  setVariation(variation: string): Session
  /**
   * Sets the restore link for the current session. Restore links can be leveraged
   * in email campaigns. Restore links allow the the user to restore the cart
   * contents in a single click.
   * <br/><br/>
   * Read more about
   * {@link https://help.nosto.com/en/articles/664692|how to leverage the restore cart link}
   *
   * @example
   * nostojs(api => api
   *   .defaultSession()
   *   .setRestoreLink("https://jeans.com/session/restore?sid=6bdb69d5-ed15-4d92")
   *   .viewCart()
   *   .setPlacements(["free-shipper"])
   *   .load()
   *   .then(data => console.log(data)))
   *
   * @public
   * @param {String} restoreLink the secure URL to restore the user's current session
   * @returns {Session} the current session
   */
  setRestoreLink(restoreLink: string): Session
  /**
   * Sets the response type to HTML or JSON_ORIGINAL. This denotes the preferred
   * response type of the recommendation result.
   * If you would like to access the raw recommendation data in <code>JSON</code> form, specify
   * <code>JSON</code>. When you specify JSON, you will need to template the result yourself.
   * If you require a more simplified approach, specify <code>HTML</code>. When you specify
   * <code>HTML</code>, you get back HTML blobs, that you may simply inject into
   * you placements.
   *
   * @example
   * nostojs(api => api
   *   .defaultSession()
   *   .setResponseMode("HTML")
   *   .viewCart()
   *   .setPlacements(["free-shipper"])
   *   .load()
   *   .then(data => console.log(data)))
   *
   * @public
   * @param {String} mode the response mode for the recommendation data
   * @returns {Session} the current session
   */
  setResponseMode(mode: RenderMode): Session
  /**
   * Create a new action for a front page. This should be used when the user
   * visits the home page.
   * <br/><br/>
   * You must invoke [the load method]{@link Action#load} on the resultant
   * action in order for the request to be made.
   * <br/><br/>
   * You do not need to specify the page-type explicitly as it is inferred
   * from the action.
   *
   * @example
   * nostojs(api => api
   *   .defaultSession()
   *   .viewFrontPage()
   *   .setPlacements(["best-seller"])
   *   .load()
   *   .then(data => console.log(data)))
   *
   *
   * @public
   * @returns {Action} the action instance to load content or track events.
   */
  viewFrontPage(): Action
  /**
   * Create a new action for a cart page. This should be used on all cart and
   * checkout pages. If your site has a multi-step checkout, it is recommended
   * that you send this event on each checkout page.
   * <br/><br/>
   * You must invoke [the load method]{@link Action#load} on the resultant
   * action in order for the request to be made.
   * <br/><br/>
   * You do not need to specify the page-type explicitly as it is inferred
   * from the action.
   *
   * @example
   * nostojs(api => api
   *   .defaultSession()
   *   .viewCart()
   *   .setPlacements(["free-shipper"])
   *   .load()
   *   .then(data => console.log(data)))
   *
   * @public
   * @returns {Action} the action instance to load content or track events.
   */
  viewCart(): Action
  /**
   * Create a new action for a not found page. This should be used only on 404
   * pages.
   * <br/><br/>
   * You must invoke [the load method]{@link Action#load} on the resultant
   * action in order for the request to be made.
   * <br/><br/>
   * You do not need to specify the page-type explicitly as it is inferred
   * from the action.
   *
   * @example
   * nostojs(api => api
   *   .defaultSession()
   *   .viewNotFound()
   *   .setPlacements(["best-seller"])
   *   .load()
   *   .then(data => console.log(data)))
   *
   * @public
   * @returns {Action} the action instance to load content or track events.
   */
  viewNotFound(): Action
  /**
   * Create a new action for a product page. This must be used only when a
   * product is being viewed. In case a specific SKU of the product is being viewed, use viewProductSku instead.
   * <br/><br/>
   * You must invoke [the load method]{@link Action#load} on the resultant
   * action in order for the request to be made.
   * <br/><br/>
   * You do not need to specify the page-type explicitly as it is inferred
   * from the action.
   *
   * @example
   * nostojs(api => api
   *   .defaultSession()
   *   .viewProduct("101")
   *   .setCategories(["/men/trousers"])
   *   .setRef("123", "example_reco_id")
   *   .setPlacements(["cross-seller"])
   *   .load()
   *   .then(data => console.log(data)))
   *
   * @public
   * @param product
   * @returns {Action} the action instance to load content or track events.
   */
  viewProduct(product: string | Product): Action
  /**
   * Create a new action for a product page when a specific SKU has been chosen. This must be used only when a
   * product and specific SKU is being viewed.
   * <br/><br/>
   * You must invoke [the load method]{@link Action#load} on the resultant
   * action in order for the request to be made.
   * <br/><br/>
   * You do not need to specify the page-type explicitly as it is inferred
   * from the action.
   *
   * @example
   * nostojs(api => api
   *   .defaultSession()
   *   .viewProductSku("101", "101-sku-1")
   *   .setCategories(["/men/trousers"])
   *   .setRef("123", "example_reco_id")
   *   .setPlacements(["cross-seller"])
   *   .load()
   *   .then(data => console.log(data)))
   *
   * @public
   * @param productId
   * @param skuId
   * @returns {Action} the action instance to load content or track events.
   */
  viewProductSku(productId: string, skuId: string): Action
  /**
   * Create a new action for a category page. This should be used on all
   * category, collection of brand pages.
   * <br/><br/>
   * You must invoke [the load method]{@link Action#load} on the resultant
   * action in order for the request to be made.
   * <br/><br/>
   * You do not need to specify the page-type explicitly as it is inferred
   * from the action.
   *
   * @example
   * nostojs(api => api
   *   .defaultSession()
   *   .viewCategory("/men/shoes")
   *   .setPlacements(["category123"])
   *   .load()
   *   .then(data => console.log(data)))
   *
   * @public
   * @param {Array<String>} categories
   * @returns {Action} the action instance to load content or track events.
   */
  viewCategory(...categories: string[]): Action
  /**
   * Create a new action for a tag page. This should be used only on tag pages.
   * <br/><br/>
   * You must invoke [the load method]{@link Action#load} on the resultant
   * action in order for the request to be made.
   * <br/><br/>
   * You do not need to specify the page-type explicitly as it is inferred
   * from the action.
   * Note: tags are not case-sensitive.
   *
   * @example
   * nostojs(api => api
   *   .defaultSession()
   *   .viewTag("colourful")
   *   .load()
   *   .then(data => console.log(data)))
   *
   * @public
   * @deprecated as this is an advanced action with a limited a use case
   * @param {Array<String>} tags the set of the tags being viewed.
   * @returns {Action} the action instance to load content or track events.
   */
  viewTag(...tags: string[]): Action
  /**
   * Create a new action with custom fields.
   * <br/><br/>
   * You must invoke [the load method]{@link Action#load} on the resultant
   * action in order for the request to be made.
   * <br/><br/>
   * You do not need to specify the page-type explicitly as it is inferred
   * from the action.
   * Note: tags are not case-sensitive.
   *
   * @example
   * nostojs(api => api
   *   .defaultSession()
   *   .viewCustomField({material: "cotton"})
   *   .load()
   *   .then(data => console.log(data)))
   *
   * @public
   * @deprecated as this is an advanced action with a limited a use case
   * @param {Object} customFields custom fields being viewed.
   * @returns {Action} the action instance to load content or track events.
   */
  viewCustomField(customFields: Record<string, string[]>): Action
  /**
   * Create a new action for a search page. This should be used only
   * on search pages. A search page action requires you to pass the search
   * term. For example, if the user search for "black shoes", you must pass
   * in "black shoes" and not an encoded version such as "black+shoes".
   * <br/><br/>
   * You must invoke [the load method]{@link Action#load} on the resultant
   * action in order for the request to be made.
   * <br/><br/>
   * You do not need to specify the page-type explicitly as it is inferred
   * from the action.
   * Search terms are not case-sensitive.
   *
   * @example
   * nostojs(api => api
   *   .defaultSession()
   *   .viewSearch("black shoes")
   *   .load()
   *   .then(data => console.log(data)))
   *
   * @public
   * @param {Array.<String>} searchTerms the non-encoded search terms
   * @returns {Action} the action instance to load content or track events.
   */
  viewSearch(...searchTerms: string[]): Action
  /**
   * Create a new action for a general page. This should be used only on
   * pages that don't have a corresponding action. For example, if the user
   * is viewing a page such as a "Contact Us" page, you should use the viewOther
   * action.
   * <br/><br/>
   * You must invoke [the load method]{@link Action#load} on the resultant
   * action in order for the request to be made.
   * <br/><br/>
   * You do not need to specify the page-type explicitly as it is inferred
   * from the action.
   *
   * @example
   * nostojs(api => api
   *   .defaultSession()
   *   .viewOther()
   *   .load()
   *   .then(data => console.log(data)))
   *
   * @public
   * @returns {Action} the action instance to load content or track events.
   */
  viewOther(): Action
  /**
   * Create a new action for an order page. This should only be used on order
   * confirmation / thank you pages.
   * <br/><br/>
   * You do not need to specify the page-type explicitly as it is inferred
   * from the action.
   * <br/><br/>
   * You must invoke [the load method]{@link Action#load} on the resultant
   * action in order for the request to be made.
   *
   * @example
   * nostojs(api => {
   *   api.defaultSession()
   *    .addOrder({
   *      external_order_ref: "145000006",
   *      info: {
   *        order_number: "195",
   *        email: "mridang@nosto.com",
   *        first_name: "Mridang",
   *        last_name: "Agarwalla",
   *        type: "order",
   *        newsletter: true
   *      },
   *      items: [{
   *        product_id: "406",
   *        sku_id: "243",
   *        name: "Linen Blazer (White, S)",
   *        quantity: 1,
   *        unit_price: 455,
   *        price_currency_code: "EUR"
   *      }]
   *    })
   *    .setPlacements(["order-related"])
   *    .load()
   *    .then(data => {
   *      console.log(data.recommendations)
   *    })
   *  })
   * @public
   * @param {Order} order the information about the order that was placed
   * @returns {Action} the action instance to load content or track events.
   */
  addOrder(order: Order): Action
  /**
   * Creates an action to report that product was added to the shopping cart,
   * e.g. from the recommendation slot with "Add to cart" button.
   * <p>
   * You must invoke [the load method]{@link Action#load} on the resultant
   * action in order for the request to be made.
   *
   *
   * @example
   * nostojs(api => api
   *   .defaultSession()
   *   .reportAddToCart("123", "reco-slot-1")
   *   .load()
   *   .then(data => console.log(data)))
   *
   * @public
   * @param product
   * @param element
   * @returns {Action} the action instance to load content or track events.
   */
  reportAddToCart(product: string, element: string): Action
  /**
   * @example
   * nostojs(api => api
   *  .defaultSession()
   *  .recordAttribution("vp", "12345678", "123456")
   *  .done()
   *  .then(data => console.log(data))
   *  @param { EventType } type
   * @param { String } target
   * @param { String | undefined } [ref]
   * @param { String | undefined } [refSrc]
   *  @return { Object }
   *
   */
  recordAttribution(type: EventType, target: string, ref: string, refSrc: string): object
}

/**
 * @group Types
 */
export interface Action {
  /**
   * Handles click attribution for product recommendations.
   * This can be called when reporting a product view
   * to signal that the view is a result of a click on a recommendation.
   *
   * @public
   * @param {String} productId currently viewed product's product id
   * @param {String} reference value of result_id from the recommendation response that was clicked
   * @return {Action}
   */
  setRef(productId: string, reference: string): Action
  /**
   * Allows you to provide an additional recommender hint that a product is being
   * viewed.
   * <br/><br/>
   * You must invoke [the load method]{@link Action#load} on the resultant
   * action in order for the request to be made.
   *
   * @public
   * @param {String} product the identifier of the product being viewed
   * @return {Action} the instance of the action
   */
  setProduct(product: string | Product): Action
  /**
   * @deprecated
   * @param {Array<String>} products
   * @return {Action}
   */
  setProducts(products: (string | Product)[]): Action
  /**
   * Sets the information about the user's current shopping cart. It the user
   * does not have any items in his shopping cart, you can pass <code>null<code>.
   * Passing <code>null<code> will nullify the user's shopping cart on Nosto's
   * end. You must also pass in the shopping cart content in it's entirety as
   * partial content are not supported.
   * <br/><br/>
   * It is not recommended to pass the current cart contents to an action but
   * instead use the the session
   * <br/><br/>
   * You must invoke [the load method]{@link Action#load} on the resultant
   * action in order for the request to be made.
   *
   * @see {@link Session#setCart}
   * @return {Action}
   */
  setCart(cart: Cart): Action
  /**
   * Sets the information about the currently logged in customer. If the current
   * customer is not provided, you will not be able to leverage features such as
   * triggered emails. While it is recommended to always provide the details of
   * the currently logged in customer, it may be omitted if there are concerns
   * about privacy or compliance.
   * <br/><br/>
   * It is not recommended to pass the current customer details to an action but
   * instead use the the session
   * <br/><br/>
   * You must invoke [the load method]{@link Action#load} on the resultant
   * action in order for the request to be made.
   *
   * @see {@link Session#setCustomer}
   * @public
   * @param {Customer} customer the details of the currently logged in customer
   * @return {Action}
   */
  setCustomer(customer: Customer): Action
  /**
   * @param {Order} order
   * @return {Action}
   */
  setOrder(order: Order): Action
  /**
   * <br/><br/>
   * You must invoke [the load method]{@link Action#load} on the resultant
   * action in order for the request to be made.
   *
   * @public
   * @param searchTerms
   * @return {Action}
   */
  setSearchTerms(searchTerms: string[]): Action
  /**
   * <br/><br/>
   * You must invoke [the load method]{@link Action#load} on the resultant
   * action in order for the request to be made.
   *
   * @public
   * @param {Array<String>} categories
   * @return {Action}
   */
  setCategories(categories: string[]): Action
  /**
   * <br/><br/>
   * You must invoke [the load method]{@link Action#load} on the resultant
   * action in order for the request to be made.
   *
   * @public
   * @param {Array<String>} categoryIds
   * @return {Action}
   */
  setCategoryIds(categoryIds: string[]): Action
  /**
   * <br/><br/>
   * You must invoke [the load method]{@link Action#load} on the resultant
   * action in order for the request to be made.
   *
   * @public
   * @param {Array<String>} parentCategoryIds
   * @return {Action}
   */
  setParentCategoryIds(parentCategoryIds: string[]): Action
  /**
   * <br/><br/>
   * You must invoke [the load method]{@link Action#load} on the resultant
   * action in order for the request to be made.
   *
   * @public
   * @param tags
   * @return {Action}
   */
  setTags(tags: string[]): Action
  /**
   * <br/><br/>
   * You must invoke [the load method]{@link Action#load} on the resultant
   * action in order for the request to be made.
   *
   * @public
   * @param customFields
   * @return {Action}
   */
  setCustomFields(customFields: Record<string, string[]>): Action
  /**
   * Sets the current variation identifier for the session. A variation identifier
   * identifies the current currency (or the current customer group). If your site
   * uses multi-currency, you must provide the ISO code current currency being viewed.
   * <br/><br/>
   * It is not recommended to pass the variation identifier to an action but
   * instead use the the session.
   * <br/><br/>
   * You must invoke [the load method]{@link Action#load} on the resultant
   * action in order for the request to be made.
   *
   * @see {@link Session#setVariation}
   * @public
   * @param {String} variation the case-sensitive identifier of the current variation
   * @return {Action}
   */
  setVariation(variation: string): Action
  /**
   * <br/><br/>
   * You must invoke [the load method]{@link Action#load} on the resultant
   * action in order for the request to be made.
   *
   * @public
   * @param {Array.<String>} placements
   * @return {Action}
   */
  setPlacements(placements: string[]): Action
  /**
   * Sets the restore link for the current session. Restore links can be leveraged
   * in email campaigns. Restore links allow the the user to restore the cart
   * contents in a single click.
   * <br/><br/>
   * Read more about
   * {@link https://help.nosto.com/en/articles/664692|how to leverage the restore cart link}
   * <br/><br/>
   * It is not recommended to pass the restore link to an action but instead use the the
   * session.
   * <br/><br/>
   * You must invoke [the load method]{@link Action#load} on the resultant
   * action in order for the request to be made.
   *
   * @see {@link Session#setRestoreLink}
   * @public
   * @param {String} restoreLink the secure URL to restore the user's current session
   * @return {Action}
   */
  setRestoreLink(restoreLink: string): Action
  /**
   * Sets the identifier of the current page type to the current request. The different
   * page types are product, front, search, cart, order, category, notfound and other.
   * <br/><br/>
   * You must invoke [the load method]{@link Action#load} on the resultant
   * action in order for the request to be made.
   * <br/><br/>
   * It is not recommended to pass the page type to an action but instead use the the
   * session.
   * <br/><br/>
   * You must invoke [the load method]{@link Action#load} on the resultant
   * action in order for the request to be made.
   *
   * @see {@link Session#viewFrontPage} for when a front or home page is being viewed
   * @see {@link Session#viewCart} for when a cart or checkout page is being viewed
   * @see {@link Session#viewNotFound} for when a not-found or 404 page is being viewed
   * @see {@link Session#viewProduct} for when a product page is being viewed
   * @see {@link Session#viewCategory} for when a category, collection or brand page is being viewed
   * @see {@link Session#viewTag} for when a tag page is being viewed
   * @see {@link Session#viewSearch} for when a search page is being viewed
   * @see {@link Session#viewOther} for when a miscellaneous page is being viewed
   * @public
   */
  setPageType(pageType: PageType): Action
  /**
   * @public
   * @return {Object}
   */
  dumpData(): Data
  update(): unknown
  load(flags?: RecommendationRequestFlags): Promise<ActionResponse>
}

export interface ActionResponse {
  recommendations: Record<string, unknown>
  campaigns?: {
    recommendations: Record<string, unknown>
    content: Record<string, unknown>
  }
  page_views: number
  geo_location: string[]
  affinities: CustomerAffinityResponse
  cmpid: string
}
