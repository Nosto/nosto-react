import { Product } from "../../types";
import React, { useEffect } from "react";
import { useNostoContext } from "../Provider/context.client";

const NostoProduct: React.FC<{ product: string; tagging: Product }> = ({
  product,
  tagging,
}) => {
  const { clientScriptLoaded, currentVariation } = useNostoContext();
  useEffect(() => {
    // @ts-ignore
    if (clientScriptLoaded) {
      window.nostojs(
        (api: any) => {
          api
            .defaultSession()
            .setVariation(currentVariation)
            .setResponseMode("HTML")
            .viewProduct(product)
            .setPlacements(api.placements.getPlacements())
            .load()
            .then((data: object) => {
              // @ts-ignore
              api.placements.injectCampaigns(data.recommendations);
            });
        },
        [clientScriptLoaded, currentVariation, product]
      );
    }
  });

  return (
    <>
      <div className="nosto_page_type" style={{ display: "none" }}>
        product
      </div>
      <div className="nosto_product" style={{ display: "none" }}>
        {tagging?.variationId && (
          <span className="variation_id">{tagging.variationId}</span>
        )}
        {product && <span className="product_id">{product}</span>}
        {tagging?.name && <span className="name">{tagging.name}</span>}
        {tagging?.url && <span className="url">{tagging.url.toString()}</span>}
        {tagging?.imageUrl && (
          <span className="image_url">{tagging.imageUrl.toString()}</span>
        )}
        {tagging?.availability && (
          <span className="availability">{tagging.availability}</span>
        )}
        {tagging?.price && <span className="price">{tagging.price}</span>}
        {tagging?.listPrice && (
          <span className="list_price">{tagging.listPrice}</span>
        )}
        {tagging?.priceCurrencyCode && (
          <span className="price_currency_code">
            {tagging.priceCurrencyCode}
          </span>
        )}
        {tagging?.brand && <span className="brand">{tagging.brand}</span>}
        {tagging?.description && (
          <span className="description">{tagging.description}</span>
        )}
        {tagging?.googleCategory && (
          <span className="description">{tagging.googleCategory}</span>
        )}
        {tagging?.condition && (
          <span className="condition">{tagging.condition}</span>
        )}
        {tagging?.gender && <span className="gender">{tagging.gender}</span>}
        {tagging?.ageGroup && (
          <span className="age_group">{tagging.ageGroup}</span>
        )}
        {tagging?.gtin && <span className="gtin">{tagging.gtin}</span>}
        {tagging?.category &&
          tagging?.category.map((category, index) => (
            <span className="category" key={index}>
              {category}
            </span>
          ))}
        {tagging?.tags1 &&
          tagging.tags1.map((tag, index) => (
            <span className="tag1" key={index}>
              {tag}
            </span>
          ))}
        {tagging?.tags2 &&
          tagging.tags2.map((tag, index) => (
            <span className="tag2" key={index}>
              {tag}
            </span>
          ))}
        {tagging?.tags3 &&
          tagging.tags3.map((tag, index) => (
            <span className="tag3" key={index}>
              {tag}
            </span>
          ))}
        {tagging?.ratingValue && (
          <span className="rating_value">{tagging.ratingValue}</span>
        )}
        {tagging?.reviewCount && (
          <span className="review_count">{tagging.reviewCount}</span>
        )}
        {tagging?.alternateImageUrls &&
          tagging.alternateImageUrls.map((url, index) => (
            <span className="alternate_image_url" key={index}>
              {url.toString()}
            </span>
          ))}
        {tagging?.customFields &&
          Object.keys(tagging.customFields).map(
            (field, index) =>
              tagging.customFields &&
              tagging.customFields[field] && (
                <span className={field} key={index}>
                  {tagging.customFields[field]}
                </span>
              )
          )}
        {tagging?.skus &&
          tagging.skus.map((sku, index) => (
            <span className="nosto_sku" key={index}>
              {sku?.id && <span className="product_id">{sku.id}</span>}
              {sku?.name && <span className="name">{sku.name}</span>}
              {sku?.price && <span className="price">{sku.price}</span>}
              {sku?.listPrice && (
                <span className="list_price">{sku.listPrice}</span>
              )}
              {sku?.url && <span className="url">{sku.url.toString()}</span>}
              {sku?.imageUrl && (
                <span className="image_url">{sku.imageUrl.toString()}</span>
              )}
              {sku?.gtin && <span className="gtin">{sku.gtin}</span>}
              {sku?.availability && (
                <span className="availability">{sku.availability}</span>
              )}
              {sku?.customFields &&
                Object.keys(sku.customFields).map(
                  (field, index) =>
                    sku.customFields &&
                    sku.customFields[field] && (
                      <span className={field} key={index}>
                        {sku.customFields[field]}
                      </span>
                    )
                )}
            </span>
          ))}
      </div>
    </>
  );
};

export default NostoProduct;
