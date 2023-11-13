declare global {
  interface Window {
    nosto?: {
      reload(settings: unknown): void;
    };
    nostojs: {
      (callback: (api: NostoClient) => void): void;
      q?: unknown[];
    };
  }
}

/**
 * @group Types
 */
export interface Affinity {
  name: string;
  score: number;
}

/**
 * @group Types
 */
export interface SessionAction {
  setPlacements(placements: string[]): SessionAction;
  load(): Promise<{
    affinities: Record<string, Affinity[]>;
    geo_location?: string[];
    page_views: number;
    recommendations: Recommendation[];
  }>;
}

/**
 * @group Types
 */
export interface NostoSession {
  setCart(cart?: Cart): NostoSession;
  setCustomer(customer?: Customer): NostoSession;
  setResponseMode(mode: string): NostoSession;
  setVariation(variation: string): NostoSession;
  addOrder(order: { purchase: Purchase }): SessionAction; 
  viewCategory(category: string): SessionAction;
  viewProduct(product: string): SessionAction;
  viewFrontPage(): SessionAction;
  viewNotFound(): SessionAction;
  viewOther(): SessionAction;
  viewSearch(query: string): SessionAction;
  viewCart(): SessionAction;
}

/**
 * @group Types
 */
export interface NostoClient {
  setAutoLoad(autoload: boolean): NostoClient;
  defaultSession(): NostoSession;
  placements: {
    getPlacements(): string[];
  };
}

/**
 * @group Types
 */
export interface Recommendation {
  result_id: string;
  products: Product[];
  result_type: string;
  title: string;
  div_id: string;
  source_product_ids: string[];
  params: unknown;
}

/**
 * @group Types
 */
export interface Item {
  name: string;
  price_currency_code: string;
  product_id: string;
  quantity: number;
  sku_id: string;
  unit_price: number;
}

/**
 * @group Types
 */
export interface Cart {
  items: Item[];
}

/**
 * @group Types
 */
export interface Customer {
  customer_reference: string;
  email: string;
  first_name: string;
  last_name: string;
  newsletter: boolean;
}

/**
 * @group Types
 */
export interface Buyer {
  first_name: string;
  last_name: string;
  email: string;
  type: string;
  newsletter: boolean;
}

/**
 * @group Types
 */
export interface Purchase {
  number: string;
  info: Buyer;
  items: Item[];
}

/**
 * @group Types
 */
export interface SKU {
  id: string;
  name: string;
  price: number;
  listPrice?: number;
  url: URL;
  imageUrl: URL;
  gtin?: string;
  availability: "InStock" | "OutOfStock";
  customFields?: { [key: string]: string };
}

/**
 * @group Types
 */
export interface Product {
  alternateImageUrls?: URL[];
  availability: "InStock" | "OutOfStock";
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
