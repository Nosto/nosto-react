export type Item = {
  name: string;
  price_currency_code: string;
  product_id: string;
  quantity: number;
  sku_id: string;
  unit_price: number;
};

export type Cart = {
  items: Item[];
};

export type Customer = {
  customer_reference: string;
  email: string;
  first_name: string;
  last_name: string;
  newsletter: boolean;
};

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
