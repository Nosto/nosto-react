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

export interface Product {
  alternateImageUrls?: URL[];
  availability: string;
  brand?: string;
  categories: string[];
  description: string;
  googleCategory?: string;
  imageUrl: URL;
  listPrice?: number;
  name: string;
  price: number;
  ratingValue?: number;
  reviewCount?: number;
  priceCurrencyCode: string;
  productId: string;
  tag1?: string[];
  tag2?: string[];
  tag3?: string[];
  thumbUrl?: URL;
  url: URL;
  customFields?: Array<{ [key: string]: string }>;
}
