import stringinate from "../../utils/stringinate";
import React, { FunctionComponent, useEffect } from "react";
import snakeize from "snakeize";

interface Product {
  alternateImageUrls?: URL[]
  availability: string
  brand?: string
  categories: string[]
  description: string
  googleCategory?: string
  imageUrl: URL
  listPrice?: number
  name: string
  price: number
  ratingValue?: number
  reviewCount?: number
  priceCurrencyCode: string
  productId: string
  tag1?: string[]
  tag2?: string[]
  tag3?: string[]
  thumbUrl?: URL
  url: URL
  customFields?: Array<{ [key: string]: string }>
}

const Product: FunctionComponent<{ product: string, tagging: Product }> = ({ product, tagging }) => {

  useEffect(() => {
    // @ts-ignore
    window.nostojs(api => {
      api.defaultSession()
        .setResponseMode("HTML")
        .viewProduct(snakeize(stringinate(tagging)))
        .setPlacements(api.placements.getPlacements())
        .load()
        .then((data: object) => {
          // @ts-ignore
          api.placements.injectCampaigns(data.recommendations);
        });
    });
  }, []);

  return (
    <>
      <div className="nosto_page_type" style={{ display: "none" }}>product</div>
      <div className="nosto_product" style={{ display: "none" }}>
        {
          tagging.productId &&
          <span className="product_id">{tagging.productId}</span>
        }
        {
          tagging.name &&
          <span className="name">{tagging.name}</span>
        }
        {
          tagging.url &&
          <span className="url">{tagging.url.toString()}</span>
        }
        {
          tagging.imageUrl &&
          <span className="image_url">{tagging.imageUrl.toString()}</span>
        }
        {
          tagging.availability &&
          <span className="availability">{tagging.availability}</span>
        }
        {
          tagging.price &&
          <span className="price">{tagging.price}</span>
        }
        {
          tagging.listPrice &&
          <span className="list_price">{tagging.listPrice}</span>
        }
        {
          tagging.priceCurrencyCode &&
          <span className="price_currency_code">{tagging.priceCurrencyCode}</span>
        }
        {
          tagging.brand &&
          <span className="brand">{tagging.brand}</span>
        }
        {
          tagging.description &&
          <span className="description">{tagging.description}</span>
        }
        {
          tagging.googleCategory &&
          <span className="description">{tagging.googleCategory}</span>
        }
        {
          tagging.categories &&
          tagging.categories.map((category, index) => (
          <span className="category" key={index}>{category}</span>
        ))}
        {
          tagging.tag1 &&
          tagging.tag1.map((tag, index) => (
          <span className="tag1" key={index}>{tag}</span>
        ))}
        {
          tagging.tag2 &&
          tagging.tag2.map((tag, index) => (
          <span className="tag2" key={index}>{tag}</span>
        ))}
        {
          tagging.tag3 &&
          tagging.tag3.map((tag, index) => (
          <span className="tag3" key={index}>{tag}</span>
        ))}
        {
          tagging.ratingValue &&
          <span className="rating_value">{tagging.ratingValue}</span>
        }
        {
          tagging.reviewCount &&
          <span className="review_count">{tagging.reviewCount}</span>
        }
        {
          tagging.alternateImageUrls &&
          tagging.alternateImageUrls.map((url, index) => (
          <span className="alternate_image_url" key={index}>{url.toString()}</span>
        ))}

        {
          tagging.customFields &&
          tagging.customFields.map((field, index) => (
          <span className={field.key} key={index}>{field.key}</span>
        ))}
        <span className="custom_fields">
          <span className="material">Cotton</span>
          <span className="weather">Summer</span>
        </span>
      </div>
    </>
  );
};

export default Product;
