interface Event {
  cart_popup?: boolean
  preview?: boolean
  skipcache?: boolean
  elements?: string[]
  events?: [string, string][]
  response_mode?: string
  url?: string
  categories?: string[]
  page_type?: string
}

function createEvent(event: Event): Event {
  return {
    cart_popup: false,
    preview: false,
    skipcache: false,
    elements: [],
    events: [],
    response_mode: "JSON_ORIGINAL",
    url: "http://localhost/",
    ...event
  }
}

export function frontEvent() {
  return createEvent({
    elements: ["frontpage-nosto-1", "frontpage-nosto-3", "frontpage-nosto-4"],
    page_type: "front"
  })
}

export function categoryEvent(category: string) {
  return createEvent({
    elements: ["categorypage-nosto-1", "categorypage-nosto-2"],
    page_type: "category",
    categories: [category],
    url: `http://localhost/collections/${category}`
  })
}

export function productEvent(product: string) {
  return createEvent({
    elements: ["productpage-nosto-1", "productpage-nosto-2", "productpage-nosto-3"],
    events: [["vp", product]],
    page_type: "product",
    url: `http://localhost/products/${product}`
  })
}
