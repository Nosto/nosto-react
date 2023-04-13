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

export interface NostoClient {
  addOrder(order: { purchase: Purchase }): NostoClient;
  defaultSession(): NostoClient;
  setAutoLoad(autoload: boolean): NostoClient;
  setCart(cart?: Cart): NostoClient;
  setCustomer(customer?: Customer): NostoClient;
  setPlacements(placements: string[]): NostoClient;
  setResponseMode(mode: string): NostoClient;
  setVariation(variation: string): NostoClient;
  viewCategory(category: string): NostoClient;
  viewProduct(product: string): NostoClient;
  viewFrontPage(): NostoClient;
  viewNotFound(): NostoClient;
  viewOther(): NostoClient;
  viewSearch(query: string): NostoClient;
  viewCart(): NostoClient;
  load(): Promise<{
    affinities: Record<
      string,
      {
        name: string;
        score: number;
      }[]
    >;
    geo_location?: string[];
    page_views: number;
    recommendations: Recommendation[];
  }>;
  placements: {
    getPlacements(): string[];
  };
}

export interface Recommendation {
  result_id: string;
  products: Product[];
  result_type: string;
  title: string;
  div_id: string;
  source_product_ids: string[];
  params: unknown;
}

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
  availability: "InStock" | "OutOfStock";
  customFields?: { [key: string]: string };
}

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
